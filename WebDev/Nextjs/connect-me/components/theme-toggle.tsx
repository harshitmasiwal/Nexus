"use client"
import * as React from 'react'
import { Sun , Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'

const ModeToggle = () => {

    const {theme , setTheme} = useTheme()
    const [mounted , setMounted] = React.useState(false)

    React.useEffect(()=>{
        setMounted(true)
    },[])

    if(!mounted){
        return null
    }

  return (
    <Button variant="outline" size="icon" 
    onClick={()=>{
      setTheme(theme === "dark" ? "light" : "dark")
    }}>
      {theme === "dark" ? <Sun></Sun>:<Moon></Moon>}
    </Button>
  )
}

export default ModeToggle
