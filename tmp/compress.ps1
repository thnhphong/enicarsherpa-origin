Add-Type -AssemblyName System.Drawing
$TimelineRoot = "public/images/Timeline"
$files = Get-ChildItem -Path $TimelineRoot -Recurse -File -Include *.png, *.jpg, *.JPG, *.PNG

foreach ($file in $files) {
    if ($file.Length -gt 1MB) {
        Write-Host "Compressing $($file.Name) ($([math]::round($file.Length / 1MB, 2)) MB)..."
        try {
            # Load image safely
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            
            $maxWidth = 2000
            $newWidth = $img.Width
            $newHeight = $img.Height
            
            if ($img.Width -gt $maxWidth) {
                $ratio = $maxWidth / $img.Width
                $newWidth = $maxWidth
                $newHeight = [int]($img.Height * $ratio)
            }
            
            $bmp = new-object System.Drawing.Bitmap($newWidth, $newHeight)
            $graphics = [System.Drawing.Graphics]::FromImage($bmp)
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            
            $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
            
            $img.Dispose()
            $graphics.Dispose()
            
            $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | where {$_.MimeType -eq "image/jpeg"}
            $encoder = [System.Drawing.Imaging.Encoder]::Quality
            $params = new-object System.Drawing.Imaging.EncoderParameters(1)
            $params.Param[0] = new-object System.Drawing.Imaging.EncoderParameter($encoder, 75)
            
            $destPath = Join-Path $file.DirectoryName "$($file.BaseName).jpg"
            
            # Temporary path if same name
            if ($destPath -eq $file.FullName) {
                $tempPath = $file.FullName + ".tmp"
                $bmp.Save($tempPath, $codec, $params)
                $bmp.Dispose()
                Move-Item $tempPath $file.FullName -Force
            } else {
                $bmp.Save($destPath, $codec, $params)
                $bmp.Dispose()
                Remove-Item $file.FullName
            }
            Write-Host "Success: $($file.Name) -> $([math]::round((Get-Item $destPath).Length / 1KB, 2)) KB"
        } catch {
            Write-Host "Error processing $($file.Name): $($_.Exception.Message)"
        }
    }
}
