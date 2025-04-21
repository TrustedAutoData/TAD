import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface BlockchainLinkProps {
  signature?: string
  address?: string
  label?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  className?: string
}

export function BlockchainLink({
  signature,
  address,
  label = "View on Blockchain",
  variant = "outline",
  size = "sm",
  disabled = false,
  className,
}: BlockchainLinkProps) {
  if (!signature && !address) {
    return null
  }

  // In a real app, this would use a real blockchain explorer URL
  const href = signature
    ? `https://explorer.blockchain.com/tx/${signature}`
    : `https://explorer.blockchain.com/address/${address}`

  return (
    <Button variant={variant} size={size} asChild disabled={disabled} className={className}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <ExternalLink className="mr-1 h-3 w-3" /> {label}
      </a>
    </Button>
  )
}
