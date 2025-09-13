import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FacialRecognition = ({ onScanSuccess, onClose }) => {
  const [scanStatus, setScanStatus] = useState('ready'); // ready, detecting, analyzing, success, error
  const [faceDetected, setFaceDetected] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer;
    if (scanStatus === 'detecting' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && scanStatus === 'detecting') {
      setScanStatus('error');
    }
    return () => clearTimeout(timer);
  }, [scanStatus, countdown]);

  const handleStartScan = () => {
    setScanStatus('detecting');
    setCountdown(10);
    setFaceDetected(false);
    setConfidence(0);
    
    // Simulate face detection after 2-3 seconds
    setTimeout(() => {
      setFaceDetected(true);
      setScanStatus('analyzing');
      
      // Simulate confidence building
      let conf = 0;
      const confInterval = setInterval(() => {
        conf += Math.random() * 15 + 5;
        setConfidence(Math.min(conf, 100));
        
        if (conf >= 85) {
          clearInterval(confInterval);
          setScanStatus('success');
          onScanSuccess({
            method: 'Facial Recognition',
            timestamp: new Date(),
            classId: 'CS301-2024',
            confidence: Math.round(conf),
            faceId: 'FACE_' + Math.random()?.toString(36)?.substr(2, 9)
          });
        }
      }, 300);
    }, 2000 + Math.random() * 1000);
  };

  const handleRetry = () => {
    setScanStatus('ready');
    setFaceDetected(false);
    setConfidence(0);
    setCountdown(10);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Facial Recognition</h3>
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
                <Icon name="Camera" size={64} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Position your face in the camera</p>
                <p className="text-sm text-muted-foreground mt-1">Click "Start Recognition" to begin</p>
              </div>
            )}
            
            {(scanStatus === 'detecting' || scanStatus === 'analyzing') && (
              <div className="relative w-full h-full">
                {/* Face detection overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-48 h-56 border-2 rounded-lg relative ${
                    faceDetected ? 'border-success' : 'border-primary'
                  }`}>
                    {/* Corner markers */}
                    <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 ${
                      faceDetected ? 'border-success' : 'border-primary'
                    }`}></div>
                    <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 ${
                      faceDetected ? 'border-success' : 'border-primary'
                    }`}></div>
                    <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 ${
                      faceDetected ? 'border-success' : 'border-primary'
                    }`}></div>
                    <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 ${
                      faceDetected ? 'border-success' : 'border-primary'
                    }`}></div>
                    
                    {/* Face detected indicator */}
                    {faceDetected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-success/20 rounded-full p-4">
                          <Icon name="User" size={32} className="text-success" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Status text */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                  {scanStatus === 'detecting' && (
                    <div>
                      <p className="text-foreground font-medium">
                        {faceDetected ? 'Face Detected' : 'Detecting Face...'}
                      </p>
                      <p className="text-sm text-muted-foreground">Time remaining: {countdown}s</p>
                    </div>
                  )}
                  
                  {scanStatus === 'analyzing' && (
                    <div>
                      <p className="text-foreground font-medium">Analyzing Face...</p>
                      <p className="text-sm text-muted-foreground">Confidence: {Math.round(confidence)}%</p>
                      <div className="w-32 bg-muted rounded-full h-2 mt-2">
                        <div 
                          className="bg-success h-2 rounded-full transition-all duration-300"
                          style={{ width: `${confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {scanStatus === 'success' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={32} color="white" />
                </div>
                <p className="text-success font-medium">Face Recognized Successfully!</p>
                <p className="text-sm text-muted-foreground mt-2">Confidence: {Math.round(confidence)}%</p>
              </div>
            )}
            
            {scanStatus === 'error' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="X" size={32} color="white" />
                </div>
                <p className="text-error font-medium">Recognition Failed</p>
                <p className="text-sm text-muted-foreground mt-2">Face not detected or recognized</p>
              </div>
            )}
          </div>
        </div>

        {/* Recognition Status */}
        {(scanStatus === 'detecting' || scanStatus === 'analyzing') && (
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  faceDetected ? 'bg-success' : 'bg-warning animate-pulse'
                }`}></div>
                <span className="text-sm font-medium text-foreground">
                  {faceDetected ? 'Face Detected' : 'Searching for Face'}
                </span>
              </div>
              {scanStatus === 'analyzing' && (
                <span className="text-sm text-muted-foreground">
                  {Math.round(confidence)}% Match
                </span>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">Recognition Guidelines:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Look directly at the camera</li>
            <li>• Ensure good lighting on your face</li>
            <li>• Remove sunglasses or face coverings</li>
            <li>• Keep your face within the detection frame</li>
            <li>• Stay still during the recognition process</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {scanStatus === 'ready' && (
            <Button onClick={handleStartScan} className="flex-1" iconName="Camera">
              Start Recognition
            </Button>
          )}
          
          {(scanStatus === 'detecting' || scanStatus === 'analyzing') && (
            <Button 
              variant="outline" 
              onClick={() => {
                setScanStatus('ready');
                setFaceDetected(false);
                setConfidence(0);
              }}
              className="flex-1"
              iconName="Square"
            >
              Stop Recognition
            </Button>
          )}
          
          {scanStatus === 'error' && (
            <Button onClick={handleRetry} className="flex-1" iconName="RotateCcw">
              Try Again
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

export default FacialRecognition;