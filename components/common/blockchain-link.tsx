import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { BLOCKCHAIN_CONFIG } from "@/lib/config"

interface BlockchainLinkProps {
  signature?: string
  address?: string
  label?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
}

export function BlockchainLink({
  signature,
  address,
  label = "View on Blockchain",
  variant = "outline",
  size = "sm",
  disabled = false,
}: BlockchainLinkProps) {
  if (!signature && !address) {
    return null
  }

  const href = signature
    ? `${BLOCKCHAIN_CONFIG.explorerUrl}/tx/${signature}`
    : `${BLOCKCHAIN_CONFIG.explorerUrl}/address/${address}`

  return (
    <Button variant={variant} size={size} asChild disabled={disabled}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <ExternalLink className="mr-1 h-3 w-3" /> {label}
      </a>
    </Button>
  )
}
