import { Button } from '@repo/ui/button'

export default function Home() {
  return (
    <div>
      <Button appName="web" className="bg-blue-600 p-6">
        Open alert web
      </Button>
      <div className="bg-red-700 p-8">
        <h1>Web</h1>
      </div>
    </div>
  )
}
