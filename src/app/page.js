import { redirect } from 'next/navigation'
// Comentario para redeploy
export default function Home() {
  redirect('/login')
}
