'use client'

import { useGeneratorContext } from "@/hooks/useGeneratorContext"
import RetroImage from "./RetroImage"

export default function GeneratedImage() {
  const { currentArtist } = useGeneratorContext()

  return currentArtist && (
    <RetroImage key={currentArtist.image?.url} image={currentArtist.image} />
  )
}
