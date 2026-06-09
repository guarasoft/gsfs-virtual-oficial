param(
    [Parameter(Mandatory=$true)][string]$MdPath,
    [Parameter(Mandatory=$true)][string]$DocxPath
)

$ErrorActionPreference = 'Stop'

function Convert-Inline {
    param([string]$text)
    if ([string]::IsNullOrEmpty($text)) { return $text }
    $text = $text -replace '&', '&amp;'
    $text = $text -replace '<', '&lt;'
    $text = $text -replace '>', '&gt;'
    $text = [regex]::Replace($text, '\*\*([^\*]+)\*\*', '<strong>$1</strong>')
    $text = [regex]::Replace($text, '(?<!\*)\*([^\*\n]+)\*(?!\*)', '<em>$1</em>')
    $text = [regex]::Replace($text, '`([^`]+)`', '<code>$1</code>')
    return $text
}

function Convert-MarkdownToHtml {
    param([string]$markdown)
    $lines = $markdown -split "`r?`n"
    $sb = New-Object System.Text.StringBuilder
    $i = 0
    while ($i -lt $lines.Length) {
        $line = $lines[$i]
        if ($line -match '^---+\s*$') {
            [void]$sb.AppendLine('<hr/>')
            $i++
            continue
        }
        if ($line -match '^(#{1,6})\s+(.+)$') {
            $level = $matches[1].Length
            $text = Convert-Inline $matches[2]
            [void]$sb.AppendLine("<h$level>$text</h$level>")
            $i++
            continue
        }
        if ($line -match '^\|' -and ($i+1) -lt $lines.Length -and $lines[$i+1] -match '^\|[\s\-\|:]+\|\s*$') {
            $headerLine = $line
            $i += 2
            $rows = @()
            while ($i -lt $lines.Length -and $lines[$i] -match '^\|') {
                $rows += $lines[$i]
                $i++
            }
            [void]$sb.AppendLine('<table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse;">')
            [void]$sb.AppendLine('<thead><tr>')
            $headers = $headerLine.Trim().TrimStart('|').TrimEnd('|') -split '\|'
            foreach ($h in $headers) {
                $cell = Convert-Inline ($h.Trim())
                [void]$sb.AppendLine("<th>$cell</th>")
            }
            [void]$sb.AppendLine('</tr></thead><tbody>')
            foreach ($row in $rows) {
                $cells = $row.Trim().TrimStart('|').TrimEnd('|') -split '\|'
                [void]$sb.AppendLine('<tr>')
                foreach ($c in $cells) {
                    $cell = Convert-Inline ($c.Trim())
                    [void]$sb.AppendLine("<td>$cell</td>")
                }
                [void]$sb.AppendLine('</tr>')
            }
            [void]$sb.AppendLine('</tbody></table>')
            continue
        }
        if ($line -match '^[\*\-]\s+') {
            [void]$sb.AppendLine('<ul>')
            while ($i -lt $lines.Length -and $lines[$i] -match '^[\*\-]\s+(.+)$') {
                $itemText = $matches[1]
                if ($itemText -match '^\[([ xX])\]\s+(.+)$') {
                    $checked = $matches[1] -ne ' '
                    $rest = $matches[2]
                    $box = if ($checked) { '&#9745;' } else { '&#9744;' }
                    $itemText = "$box $rest"
                }
                $itemText = Convert-Inline $itemText
                [void]$sb.AppendLine("<li>$itemText</li>")
                $i++
            }
            [void]$sb.AppendLine('</ul>')
            continue
        }
        if ($line -match '^>\s*(.*)$') {
            $q = Convert-Inline $matches[1]
            [void]$sb.AppendLine("<blockquote>$q</blockquote>")
            $i++
            continue
        }
        if ($line -match '^\s*$') {
            $i++
            continue
        }
        $para = @()
        while ($i -lt $lines.Length -and $lines[$i] -notmatch '^\s*$' -and $lines[$i] -notmatch '^#' -and $lines[$i] -notmatch '^\|' -and $lines[$i] -notmatch '^---+\s*$' -and $lines[$i] -notmatch '^[\*\-]\s+' -and $lines[$i] -notmatch '^>') {
            $para += $lines[$i]
            $i++
        }
        if ($para.Count -gt 0) {
            $text = Convert-Inline (($para -join ' ').Trim())
            [void]$sb.AppendLine("<p>$text</p>")
        }
    }
    return $sb.ToString()
}

$md = [System.IO.File]::ReadAllText($MdPath, [System.Text.Encoding]::UTF8)
$bodyHtml = Convert-MarkdownToHtml $md

$style = @'
<style>
body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #1a1a1a; }
h1 { font-size: 20pt; color: #1f3a5f; border-bottom: 2px solid #1f3a5f; padding-bottom: 6px; }
h2 { font-size: 15pt; color: #1f3a5f; margin-top: 18pt; }
h3 { font-size: 13pt; color: #2c5282; margin-top: 14pt; }
h4 { font-size: 12pt; color: #2c5282; }
table { border-collapse: collapse; width: 100%; margin: 8pt 0; }
th { background: #1f3a5f; color: #ffffff; text-align: left; padding: 6px; border: 1px solid #1f3a5f; }
td { padding: 6px; border: 1px solid #cccccc; vertical-align: top; }
tr:nth-child(even) td { background: #f5f7fa; }
hr { border: 0; border-top: 1px solid #cccccc; margin: 12pt 0; }
ul { margin: 6pt 0; padding-left: 22pt; }
li { margin: 3pt 0; }
blockquote { border-left: 4px solid #1f3a5f; padding-left: 10pt; color: #444; margin: 8pt 0; }
code { background: #f0f0f0; padding: 1px 4px; border-radius: 3px; font-family: Consolas, monospace; font-size: 10pt; }
em { color: #555; }
</style>
'@

$html = @"
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Matriz de Cenarios GSFS Virtual</title>
$style
</head>
<body>
$bodyHtml
</body>
</html>
"@

$htmlPath = [System.IO.Path]::Combine($env:TEMP, 'matriz_cenarios_gsfs.html')
$utf8Bom = New-Object System.Text.UTF8Encoding($true)
[System.IO.File]::WriteAllText($htmlPath, $html, $utf8Bom)

Write-Host "HTML written to: $htmlPath"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
    $doc = $word.Documents.Open($htmlPath, $false, $true)
    Start-Sleep -Milliseconds 500
    $wdFormatXMLDocument = 12
    if (Test-Path $DocxPath) { Remove-Item $DocxPath -Force }
    $doc.SaveAs([ref]$DocxPath, [ref]$wdFormatXMLDocument)
    $doc.Close($false)
    Write-Host "DOCX saved to: $DocxPath"
} finally {
    $word.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
