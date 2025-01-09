import { CheckCircle, Circle } from 'lucide-react'

interface TimelineItem {
  status: string
  date: string
  completed: boolean
}

interface TrackingTimelineProps {
  data: {
    status: string
    location: string
    estimatedDelivery: string
    timeline: TimelineItem[]
  }
}

export default function TrackingTimeline({ data }: TrackingTimelineProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Package Status: {data.status}</h2>
        <p className="text-gray-600">Current Location: {data.location}</p>
        <p className="text-gray-600">Estimated Delivery: {data.estimatedDelivery}</p>
      </div>
      <div className="space-y-4">
        {data.timeline.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              {item.completed ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <Circle className="h-6 w-6 text-gray-300" />
              )}
            </div>
            <div>
              <p className="font-semibold">{item.status}</p>
              <p className="text-sm text-gray-500">{item.date || 'Pending'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

