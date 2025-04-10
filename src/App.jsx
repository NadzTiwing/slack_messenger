import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [delay, setDelay] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Convert delay to milliseconds
    const delayMs = parseInt(delay) * 60 * 1000 // Convert minutes to milliseconds

    // Schedule the message
    setTimeout(async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/slack`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            webhookUrl,
            message,
          }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to send message')
        }
        
        alert('Message sent successfully!')
      } catch (error) {
        alert('Error sending message: ' + error.message)
      }
    }, delayMs)
    
    alert(`Message scheduled to be sent in ${delay} minutes`)
  }

  const getButtonText = () => {
    if (!delay) return 'Send'
    return `Send in ${delay} minute${delay === '1' ? '' : 's'}`
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 m-4">
        <h1 className=" font-bold text-center mb-6">Slack Message Scheduler</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Webhook URL
            </label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="https://hooks.slack.com/services/..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="4"
              placeholder="Enter your message..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delay (minutes)
            </label>
            <input
              type="number"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="0"
              min="0"
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex cursor-pointer justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-slate-700  hover:bg-slate-900"
          >
            {getButtonText()}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
