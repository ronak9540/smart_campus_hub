import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRScanner = ({ onScanSuccess, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('ready'); // ready, scanning, success, error
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer;
    if (isScanning && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setScanStatus('error');
      setIsScanning(false);
    }
    return () => clearTimeout(timer);
  }, [isScanning, countdown]);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanStatus('scanning');
    setCountdown(30);
    
    // Simulate QR code detection after 3-5 seconds
    setTimeout(() => {
      setScanStatus('success');
      setIsScanning(false);
      onScanSuccess({
        method: 'QR Code',
        timestamp: new Date(),
        classId: 'CS301-2024',
        location: 'Room 204'
      });
    }, 3000 + Math.random() * 2000);
  };

  const handleRetry = () => {
    setScanStatus('ready');
    setCountdown(30);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">QR Code Scanner</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Camera Preview Area */}
        <div className="relative bg-muted rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {scanStatus === 'ready' && (
              <div className="text-center">
                <Icon name="QrCode" size={64} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Click "Start Scanning" to begin</p>
              </div>
            )}
            
            {scanStatus === 'scanning' && (
              <div className="text-center">
                <div className="relative">
                  <div className="w-48 h-48 border-2 border-primary rounded-lg relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
                    
                    {/* Scanning line animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-primary animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <p className="text-foreground mt-4">Scanning for QR code...</p>
                <p className="text-sm text-muted-foreground">Time remaining: {countdown}s</p>
              </div>
            )}
            
            {scanStatus === 'success' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={32} color="white" />
                </div>
                <p className="text-success font-medium">QR Code Detected Successfully!</p>
                <p className="text-sm text-muted-foreground mt-2">Processing attendance...</p>
              </div>
            )}
            
            {scanStatus === 'error' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="X" size={32} color="white" />
                </div>
                <p className="text-error font-medium">Scan Timeout</p>
                <p className="text-sm text-muted-foreground mt-2">No QR code detected</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">Scanning Instructions:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Hold your device steady</li>
            <li>• Ensure good lighting conditions</li>
            <li>• Position QR code within the scanning frame</li>
            <li>• Keep QR code flat and unobstructed</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {scanStatus === 'ready' && (
            <Button onClick={handleStartScan} className="flex-1" iconName="Play">
              Start Scanning
            </Button>
          )}
          
          {scanStatus === 'scanning' && (
            <Button 
              variant="outline" 
              onClick={() => {
                setIsScanning(false);
                setScanStatus('ready');
              }}
              className="flex-1"
              iconName="Square"
            >
              Stop Scanning
            </Button>
          )}
          
          {scanStatus === 'error' && (
            <Button onClick={handleRetry} className="flex-1" iconName="RotateCcw">
              Retry Scan
            </Button>
          )}
          
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;