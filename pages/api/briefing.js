export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { articles, catLabel } = req.body;
  const body = articles.map(a => `${a.title}\n${a.summary}`).join('\n\n');
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `당신은 KRAFTON 이사회 전문 비서입니다. 아래 "${catLabel}" 분야 이번 주 뉴스를 이사회 임원을 위한 핵심 전략 브리핑으로 정리해주세요.\n\n형식:\n📌 핵심 시사점 (3가지 이내, 각 2-3문장)\n⚠️ 주목할 리스크 (해당 시)\n💡 크래프톤 관점 기회 요인\n\n임원 수준에 맞는 간결하고 전략적인 언어로 작성하세요.\n\n뉴스:\n${body}`
        }]
      })
    });
    const data = await response.json();
    const text = data.content?.find(b => b.type === 'text')?.text || '브리핑 생성에 실패했습니다.';
    res.json({ text });
  } catch {
    res.status(500).json({ text: '오류가 발생했습니다. 다시 시도해주세요.' });
  }
}
