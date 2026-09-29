const express = require('express')

const router = express.Router()

console.log('Ollama AI Routes Loaded Successfully')

// Ollama AI Chat
router.post('/chat', async (req, res) => {
  try {
    const { question, history = [] } = req.body

    console.log('AI Request Received:', question)

    if (!question || !question.trim()) {
      return res.status(400).json({
        message: 'Please enter a question'
      })
    }

    // Convert previous conversation into context
    const conversationHistory = history
      .map((message) => {
        const role = message.type === 'user'
          ? 'Student'
          : 'SmartCampus AI'

        return `${role}: ${message.text}`
      })
      .join('\n')

    console.log('Conversation History:', conversationHistory)

    // Detect vague follow-up questions
    let currentQuestion = question.trim()

    const vagueWords = [
      'tell me more',
      'more about it',
      'more about this',
      'more about that',
      'explain it',
      'explain this',
      'explain that',
      'what about it',
      'what about this'
    ]

    const isVagueQuestion = vagueWords.some((phrase) =>
      currentQuestion.toLowerCase().includes(phrase)
    )

    // If question is vague, use previous user question as topic
    if (isVagueQuestion && history.length > 0) {

      const previousUserMessages = history.filter(
        (message) => message.type === 'user'
      )

      if (previousUserMessages.length > 0) {

        const lastTopic =
          previousUserMessages[previousUserMessages.length - 1].text

        currentQuestion = `
The student wants more information about the previous topic.

Previous topic:
"${lastTopic}"

Student's current request:
"${question}"

Please continue explaining the previous topic.
`
      }
    }

    // AI Prompt
    const prompt = `You are SmartCampus AI Assistant for a college campus.

You are having a continuous conversation with a college student.

Conversation so far:
${conversationHistory}

Current student question:
${currentQuestion}

IMPORTANT RULES:

1. Use the previous conversation to understand the student's current question.

2. If the student says "it", "this", "that", "its", "more", "tell me more", "explain it", or similar words, identify the topic from the previous conversation.

3. Never ask the student to repeat information that already exists in the conversation.

4. If the previous conversation is about SmartCampus and the student says "Tell me more about it", explain more about SmartCampus.

5. Continue the conversation naturally.

6. Give a direct and helpful answer.

7. Keep the answer simple and concise.

8. You mainly help with:
- College
- Education
- Campus services
- Notices
- Events
- Complaints
- Student life
- SmartCampus features

9. Do not say that the student forgot to ask a question if the previous conversation provides enough context.

Now answer the student's current question.

SmartCampus AI Answer:`

    // Send request to Ollama
    const response = await fetch(
      'http://localhost:11434/api/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3.2',
          prompt: prompt,
          stream: false
        })
      }
    )

    if (!response.ok) {
      throw new Error('Ollama server is not responding')
    }

    const data = await response.json()

    console.log('Ollama Response Received')

    res.json({
      answer: data.response
    })

  } catch (error) {

    console.log('AI Error:', error.message)

    res.status(500).json({
      message:
        'Ollama AI service error. Please make sure Ollama is running.'
    })
  }
})

module.exports = router