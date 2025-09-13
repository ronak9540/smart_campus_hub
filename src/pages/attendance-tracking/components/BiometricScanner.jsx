import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BiometricScanner = ({ onScanSuccess, onClose }) => {
  const [scanStep, setScanStep] = useState(1); // 1: ready, 2: scanning, 3: verifying, 4: success/error
  const [scanStatus, setScanStatus] = useState('ready'); // ready, scanning, verifying, success, error
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (scanStatus === 'scanning') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setScanStatus('verifying');
            setScanStep(3);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else if (scanStatus === 'verifying') {
      setTimeout(() => {
        setScanStatus('success');
        setScanStep(4);
        onScanSuccess({
          method: 'Biometric',
          timestamp: new Date(),
          classId: 'CS301-2024',
          biometricId: 'FP_' + Math.random()?.toString(36)?.substr(2, 9)
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [scanStatus, onScanSuccess]);

  const handleStartScan = () => {
    setScanStatus('scanning');
    setScanStep(2);
    setProgress(0);
  };

  const handleRetry = () => {
    setScanStatus('ready');
    setScanStep(1);
    setProgress(0);
  };

  const getStepIcon = (step) => {
    if (step < scanStep) return 'CheckCircle';
    if (step === scanStep) return 'Circle';
    return 'Circle';
  };

  const getStepColor = (step) => {
    if (step < scanStep) return 'text-success';
    if (step === scanStep) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Biometric Scanner</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name={getStepIcon(1)} size={20} className={getStepColor(1)} />
            <span className={`text-sm ${scanStep >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Place Finger
            </span>
          </div>
          <div className="flex-1 h-px bg-border mx-4"></div>
          <div className="flex items-center space-x-2">
            <Icon name={getStepIcon(2)} size={20} className={getStepColor(2)} />
            <span className={`text-sm ${scanStep >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Scanning
            </span>
          </div>
          <div className="flex-1 h-px bg-border mx-4"></div>
          <div className="flex items-center space-x-2">
            <Icon name={getStepIcon(3)} size={20} className={getStepColor(3)} />
            <span className={`text-sm ${scanStep >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
              Verifying
            </span>
          </div>
        </div>

        {/* Scanner Interface */}
        <div className="relative bg-muted rounded-lg p-8 text-center">
          {scanStatus === 'ready' && (
            <div>
              <div className="w-32 h-32 mx-auto mb-4 bg-card rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <Icon name="Fingerprint" size={48} className="text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium">Ready to Scan</p>
              <p className="text-sm text-muted-foreground mt-1">Place your finger on the scanner</p>
            </div>
          )}

          {scanStatus === 'scanning' && (
            <div>
              <div className="w-32 h-32 mx-auto mb-4 bg-primary/10 rounded-lg border-2 border-primary flex items-center justify-center relative overflow-hidden">
                <Icon name="Fingerprint" size={48} className="text-primary" />
                <div 
                  className="absolute bottom-0 left-0 bg-primary/20 transition-all duration-200"
                  style={{ height: `${progress}%`, width: '100%' }}
                ></div>
              </div>
              <p className="text-foreground font-medium">Scanning Fingerprint</p>
              <p className="text-sm text-muted-foreground mt-1">Keep your finger steady</p>
              <div className="w-full bg-muted rounded-full h-2 mt-3">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{progress}% Complete</p>
            </div>
          )}

          {scanStatus === 'verifying' && (
            <div>
              <div className="w-32 h-32 mx-auto mb-4 bg-warning/10 rounded-lg border-2 border-warning flex items-center justify-center">
                <Icon name="Loader2" size={48} className="text-warning animate-spin" />
              </div>
              <p className="text-foreground font-medium">Verifying Identity</p>
              <p className="text-sm text-muted-foreground mt-1">Please wait...</p>
            </div>
          )}

          {scanStatus === 'success' && (
            <div>
              <div className="w-32 h-32 mx-auto mb-4 bg-success/10 rounded-lg border-2 border-success flex items-center justify-center">
                <Icon name="CheckCircle" size={48} className="text-success" />
              </div>
              <p className="text-success font-medium">Verification Successful!</p>
              <p className="text-sm text-muted-foreground mt-1">Attendance recorded</p>
            </div>
          )}

          {scanStatus === 'error' && (
            <div>
              <div className="w-32 h-32 mx-auto mb-4 bg-error/10 rounded-lg border-2 border-error flex items-center justify-center">
                <Icon name="XCircle" size={48} className="text-error" />
              </div>
              <p className="text-error font-medium">Verification Failed</p>
              <p className="text-sm text-muted-foreground mt-1">Please try again</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">Scanning Tips:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Clean your finger before scanning</li>
            <li>• Press firmly but gently on the scanner</li>
            <li>• Keep your finger still during scanning</li>
            <li>• Ensure your finger covers the entire scanner area</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {scanStatus === 'ready' && (
            <Button onClick={handleStartScan} className="flex-1" iconName="Fingerprint">
              Start Biometric Scan
            </Button>
          )}
          
          {(scanStatus === 'error') && (
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

export default BiometricScanner;