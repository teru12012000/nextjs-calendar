import ja from "@/shared/ja";
import Button from '@mui/material/Button';
import Link from "next/link";
export default function Home() {
  return (
    <main
      style={{
        width:"80%",
        margin:"100px auto"
      }}
    
    >
      <h1>{ja.home.title}</h1>
      <Link href="/calendar">
        <Button variant="text">
          {ja.home.pageRouting.calendar}
        </Button>
      </Link>
    </main>
    
  )
}
