param(
  [Parameter(Mandatory=$true)]
  [string]$ProjectRoot
)

$modules = Join-Path $ProjectRoot "projects\iblopay-admin\src\app\modules"
$target = Join-Path $modules "transactions"
$backup = Join-Path $modules ("transactions_backup_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
$source = Join-Path $PSScriptRoot "transactions"

if (!(Test-Path $source)) {
  Write-Error "Le dossier transactions du package est introuvable."
  exit 1
}

if (Test-Path $target) {
  Write-Host "Sauvegarde de l'ancien dossier vers $backup"
  Move-Item $target $backup
}

Write-Host "Copie du nouveau dossier transactions..."
Copy-Item $source $target -Recurse

Write-Host ""
Write-Host "Verification des fichiers compiles interdits..."
$bad = Get-ChildItem $target -Recurse -File | Where-Object {
  $_.Name -match '\.js$|\.js\.map$|\.d\.ts$|\.d\.ts\.map$'
}

if ($bad) {
  Write-Warning "Des fichiers compiles ont ete trouves:"
  $bad | ForEach-Object { Write-Host $_.FullName }
} else {
  Write-Host "OK : aucun .js/.js.map/.d.ts dans le dossier source transactions."
}

Write-Host ""
Write-Host "Termine. Lancez maintenant ng serve depuis la racine du projet."
