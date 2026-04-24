export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const formData = await request.formData();
    const osdNumber = formData.get('osd_number');

    if (!osdNumber) {
      return new Response("Missing OSD Number", { status: 400 });
    }

    // 1. Fetch data from NASA OSDR
    const nasaUrl = `https://osdr.nasa.gov/osdr/data/osd/meta/${osdNumber}`;
    const nasaResp = await fetch(nasaUrl);
    if (!nasaResp.ok) {
        throw new Error(`NASA API returned ${nasaResp.status}`);
    }
    const data = await nasaResp.json();
    const description = data['study'][`OSD-${osdNumber}`]['studies'][0]['description'];

    // 2. Call Cloudflare Workers AI
    const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: `You are a science assistant. Based on the following study description, generate a step-by-step process of the experiment in numerical order. Keep it concise.\n\nDescription: ${description}` },
        { role: 'user', content: "Generate the steps." }
      ]
    });

    const stepsText = aiResponse.response;

    // 3. Format the steps
    const formattedSteps = stepsText.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && (line.match(/^\d+\./) || line.startsWith('Note:')));

    // 4. Load the result.html template
    const templateUrl = new URL('/osdr-visualizer-main/templates/result.html', request.url);
    const templateResp = await fetch(templateUrl);
    let html = await templateResp.text();

    // Template injection
    const stepsHtml = formattedSteps.map(step => `<li>${step}</li>`).join('\n');
    
    // Replace Jinja2 loop
    html = html.replace(/\{% for step in steps %\}[\s\S]*?\{% endfor %\}/g, stepsHtml);
    // Replace Flask static url
    html = html.replace(/\{\{url_for\('static', filename='(.*?)'\)\}\}/g, '/static/$1');
    // Replace {{ step }} if it somehow remained
    html = html.replace(/\{\{ step \}\}/g, '');

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
