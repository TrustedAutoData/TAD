import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react"
import type { Status, VerificationStatus } from "@/lib/types"

interface StatusBadgeProps {
  status: Status | VerificationStatus
  showIcon?: boolean
  className?: string
}

export function StatusBadge({ status, showIcon = true, className }: StatusBadgeProps) {
  let icon = null
  let badgeClassName = ""

  switch (status) {
    case "Connected":
    case "Verified":
      icon = <CheckCircle className="mr-1 h-3 w-3" />
      badgeClassName = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      break
    case "Not Connected":
    case "Pending":
      icon = <Clock className="mr-1 h-3 w-3" />
      badgeClassName = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      break
    case "Offline":
    case "Failed":
      icon = <XCircle className="mr-1 h-3 w-3" />
      badgeClassName = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      break
    default:
      icon = <AlertCircle className="mr-1 h-3 w-3" />
      badgeClassName = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  }

  return (
    <Badge variant="outline" className={`${badgeClassName} ${className}`}>
      {showIcon && icon}
      {status}
    </Badge>
  )
}
