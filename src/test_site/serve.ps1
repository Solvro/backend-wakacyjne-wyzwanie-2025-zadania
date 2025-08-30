$port = Read-Host "Port?"
if ($port -as [int]) {
    python -m http.server $port
}
else {
    Write-Host "Number needed"
    Exit 1
}