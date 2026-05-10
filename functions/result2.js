export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const formData = await request.formData();
    const description = formData.get('osd_number');

    if (!description) {
      return new Response("Missing Description", { status: 400 });
    }

    // 1. Call Cloudflare Workers AI
    const aiResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: `You are a science assistant. Based on the following study description, generate a step-by-step process of the experiment in numerical order. Keep it concise.\n\nDescription: ${description}` },
        { role: 'user', content: "Generate the steps." }
      ]
    });

    const stepsText = aiResponse.response;

    // 2. Format the steps
    const formattedSteps = stepsText.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && (line.match(/^\d+\./) || line.startsWith('Note:')));

    // 3. Load the result.html template
    const templateUrl = new URL('/osdr-visualizer-main/templates/result.html', request.url);
    const templateResp = await fetch(templateUrl);
    let html = await templateResp.text();

    // Template injection
    const stepsHtml = formattedSteps.map(step => `<li>${step}</li>`).join('\n');
    
    html = html.replace(/\{% for step in steps %\}[\s\S]*?\{% endfor %\}/g, stepsHtml);
    html = html.replace(/\{\{url_for\('static', filename='(.*?)'\)\}\}/g, '/static/$1');
    html = html.replace(/\{\{ step \}\}/g, '');

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
