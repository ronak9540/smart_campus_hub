import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FeePaymentSection = ({ isVisible, onClose }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');

  const feeStructure = [
    {
      id: 1,
      category: "Tuition Fee",
      semester: "Fall 2025",
      amount: 2500.00,
      dueDate: "2025-09-30",
      status: "pending",
      description: "Semester tuition fee for Computer Science"
    },
    {
      id: 2,
      category: "Hostel Fee",
      semester: "Fall 2025",
      amount: 800.00,
      dueDate: "2025-09-25",
      status: "pending",
      description: "Accommodation charges for A-Block Room 204"
    },
    {
      id: 3,
      category: "Library Fee",
      semester: "Fall 2025",
      amount: 150.00,
      dueDate: "2025-09-20",
      status: "overdue",
      description: "Library access and book rental charges"
    },
    {
      id: 4,
      category: "Lab Fee",
      semester: "Fall 2025",
      amount: 300.00,
      dueDate: "2025-10-15",
      status: "upcoming",
      description: "Computer lab and equipment usage fee"
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      category: "Tuition Fee",
      amount: 2500.00,
      date: "2025-08-15",
      method: "Credit Card",
      transactionId: "TXN123456789",
      status: "completed"
    },
    {
      id: 2,
      category: "Hostel Fee",
      amount: 800.00,
      date: "2025-08-10",
      method: "Bank Transfer",
      transactionId: "TXN987654321",
      status: "completed"
    }
  ];

  const paymentMethods = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'upi', label: 'UPI Payment' },
    { value: 'net_banking', label: 'Net Banking' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'overdue':
        return 'text-error bg-error/10';
      case 'upcoming':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const handlePayment = (fee) => {
    setSelectedPayment(fee);
    setAmount(fee?.amount?.toString());
  };

  const processPayment = () => {
    if (selectedPayment && paymentMethod && amount) {
      // Mock payment processing
      alert(`Payment of $${amount} processed successfully!\nTransaction ID: TXN${Date.now()}`);
      setSelectedPayment(null);
      setPaymentMethod('');
      setAmount('');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Fee Payment Portal</h2>
              <p className="text-sm text-muted-foreground">Secure online payment gateway</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex h-full">
          {/* Fee Structure */}
          <div className="w-1/2 border-r border-border p-6 max-h-96 overflow-y-auto">
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-4">Pending Payments</h3>
              <div className="space-y-3">
                {feeStructure?.filter(fee => fee?.status !== 'upcoming')?.map((fee) => (
                  <div key={fee?.id} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{fee?.category}</h4>
                        <p className="text-sm text-muted-foreground">{fee?.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fee?.status)}`}>
                        {fee?.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-foreground">${fee?.amount?.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Due: {fee?.dueDate}</p>
                      </div>
                      <Button
                        variant={fee?.status === 'overdue' ? 'destructive' : 'default'}
                        size="sm"
                        onClick={() => handlePayment(fee)}
                        iconName="CreditCard"
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Upcoming Fees</h3>
              <div className="space-y-3">
                {feeStructure?.filter(fee => fee?.status === 'upcoming')?.map((fee) => (
                  <div key={fee?.id} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{fee?.category}</h4>
                        <p className="text-sm text-muted-foreground">{fee?.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fee?.status)}`}>
                        {fee?.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-foreground">${fee?.amount?.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Due: {fee?.dueDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="w-1/2 p-6 max-h-96 overflow-y-auto">
            {selectedPayment ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Payment Details</h3>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-foreground">{selectedPayment?.category}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{selectedPayment?.description}</p>
                    <p className="text-2xl font-bold text-foreground">${selectedPayment?.amount?.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e?.target?.value)}
                    placeholder="Enter amount"
                  />

                  <Select
                    label="Payment Method"
                    options={paymentMethods}
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                    placeholder="Select payment method"
                  />

                  {paymentMethod === 'credit_card' || paymentMethod === 'debit_card' ? (
                    <div className="space-y-4">
                      <Input label="Card Number" type="text" placeholder="1234 5678 9012 3456" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Expiry Date" type="text" placeholder="MM/YY" />
                        <Input label="CVV" type="text" placeholder="123" />
                      </div>
                      <Input label="Cardholder Name" type="text" placeholder="John Doe" />
                    </div>
                  ) : paymentMethod === 'upi' ? (
                    <Input label="UPI ID" type="text" placeholder="user@upi" />
                  ) : paymentMethod === 'bank_transfer' ? (
                    <div className="space-y-4">
                      <Input label="Account Number" type="text" placeholder="Account number" />
                      <Input label="IFSC Code" type="text" placeholder="IFSC code" />
                    </div>
                  ) : null}

                  <div className="flex gap-3">
                    <Button onClick={processPayment} iconName="CreditCard">
                      Process Payment
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-foreground mb-4">Payment History</h3>
                <div className="space-y-3">
                  {paymentHistory?.map((payment) => (
                    <div key={payment?.id} className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{payment?.category}</h4>
                          <p className="text-sm text-muted-foreground">Transaction ID: {payment?.transactionId}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment?.status)}`}>
                          {payment?.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold text-foreground">${payment?.amount?.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">{payment?.date} • {payment?.method}</p>
                        </div>
                        <Button variant="outline" size="sm" iconName="Download">
                          Receipt
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-muted-foreground mb-4">Select a pending payment to proceed</p>
                  <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeePaymentSection;