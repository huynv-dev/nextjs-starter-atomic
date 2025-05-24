import { NextRequest } from 'next/server'

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)

  // Sinh mock data
  const images = Array.from({ length: limit }).map((_, i) => {
    const id = (page - 1) * limit + i + 1
    const width = getRandomInt(300, 600)
    const height = getRandomInt(200, 400)
    return {
      id: id.toString(),
      src: `https://picsum.photos/id/${id % 1000}/${width}/${height}`,
      width,
      height,
      alt_description: `Mock image ${id}`,
    }
  })

  return Response.json(images)
} 