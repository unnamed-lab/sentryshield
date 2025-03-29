export default function PartnerLogos() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 py-8">
      <div className="flex flex-col items-center gap-2">
        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="w-24 h-12 relative flex items-center justify-center">
            <span className="text-lg font-bold text-primary">RugCheck</span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">Token Analysis</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="w-24 h-12 relative flex items-center justify-center">
            <span className="text-lg font-bold text-primary">DD.xyz</span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">Risk Scoring</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="w-24 h-12 relative flex items-center justify-center">
            <span className="text-lg font-bold text-primary">Civic</span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">Authentication</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="w-24 h-12 relative flex items-center justify-center">
            <span className="text-lg font-bold text-primary">Ethereum</span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">Blockchain</span>
      </div>
    </div>
  )
}

