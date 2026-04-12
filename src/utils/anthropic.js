// Anthropic API wrapper — Sage persona
import { getOfflineResponse } from './sageOffline.js'

const SAGE_SYSTEM_PROMPT = `You are Sage, a supportive wellness coach specialising in the post-GLP-1 medication maintenance phase. You assist adults who have successfully completed a GLP-1 medication program (such as Ozempic, Wegovy, or Mounjaro) and are now maintaining their weight without medication.

Your role:
- Provide evidence-based nutritional and lifestyle guidance
- Offer empathetic, non-judgmental support
- Help users navigate the psychological and physiological challenges of maintenance
- Celebrate progress without toxic positivity
- Acknowledge that maintenance is genuinely difficult

Your boundaries:
- You do not provide medical advice, diagnose conditions, or recommend medication changes
- Always direct clinical or medical questions to the user's healthcare provider
- Never suggest unsafe calorie restriction or extreme measures
- Do not encourage obsessive tracking or disordered thinking

Your tone:
- Warm, knowledgeable, and direct — like a trusted health coach
- Acknowledge difficulty honestly without catastrophising
- Use clinical, empowering language; avoid: "diet", "cheat", "fail", "bad food", "guilty"
- Prefer: "nourishment", "maintenance window", "mindful choice", "recalibrate"

Key knowledge areas:
- Post-GLP-1 appetite recalibration and how hunger signals change
- Protein-first eating strategies for satiety
- Metabolic adaptation after weight loss
- Habit formation and behavioural maintenance strategies
- Sleep, stress, and their relationship to weight maintenance
- The psychological journey of transitioning from active weight loss to maintenance

Important: Always end responses that touch on medical topics with a reminder to consult their healthcare provider. Keep responses concise (2–4 paragraphs max) unless the user explicitly asks for detail. You are a coach, not a therapist.`

// Only the user-supplied localStorage key activates online mode.
// The .env.local key is intentionally excluded here — it was used during
// development but caused silent failures when credits ran out, bypassing
// the offline fallback. Users set their key via Settings → Sage AI.
function getActiveKey() {
  const stored = localStorage.getItem('steady_api_key')
  if (stored && stored !== 'paste-your-key-here') return stored
  return null
}

// Returns true only when a user-supplied key is present in localStorage.
// Does NOT check the env var — we want the badge and mode to reflect
// whether the user has configured a key, not whether a dev key exists.
export function hasApiKey() {
  return Boolean(getActiveKey())
}

export async function sendChatMessage(messages, userMessage, messageCount = 0) {
  const apiKey = getActiveKey()

  if (!apiKey) {
    console.log('[Sage] mode: offline (no user key)')
    const offlineResult = getOfflineResponse(userMessage, messageCount)
    console.log('[Sage] offline engine returned — content length:', offlineResult.content?.length ?? 'undefined')
    return { success: true, isOffline: true, ...offlineResult }
  }

  console.log('[Sage] mode: online')

  const formattedMessages = [
    ...messages.slice(-20).map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage },
  ]

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SAGE_SYSTEM_PROMPT,
        messages: formattedMessages,
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      const msg = err.error?.message || `HTTP ${response.status}`
      console.error('[Sage] API error:', response.status, msg, '— falling back to offline')
      // Fall through to offline rather than throwing
      return { success: true, isOffline: true, ...getOfflineResponse(userMessage, messageCount) }
    }

    const data = await response.json()
    return {
      success: true,
      isOffline: false,
      content: data.content[0]?.text || 'No response received.',
    }
  } catch (err) {
    console.error('[Sage] fetch error — falling back to offline:', err.message)
    return { success: true, isOffline: true, ...getOfflineResponse(userMessage, messageCount) }
  }
}
