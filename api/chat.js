export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const userInput = req.body;

    // 转发请求到 N8N Webhook（替换成你自己的 webhook 地址）
    const response = await fetch('https://qian3.app.n8n.cloud/webhook-test/invoice-parser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    });

    if (!response.ok) {
      throw new Error('Failed to contact N8N');
    }

    const result = await response.json();

    // 返回结果给微信小程序（确保是数组格式）
    console.log('N8N返回的内容：', result);
    return res.status(200).json(result);

  } catch (error) {
    console.error('Error forwarding to N8N:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
