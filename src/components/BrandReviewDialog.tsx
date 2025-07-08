
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useApproveBrand } from '@/hooks/useAdmin';
import { useToast } from '@/hooks/use-toast';

interface BrandReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: any;
}

const BrandReviewDialog = ({ open, onOpenChange, request }: BrandReviewDialogProps) => {
  const [notes, setNotes] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  
  const { mutate: approveBrand, isPending } = useApproveBrand();
  const { toast } = useToast();

  const handleApprove = () => {
    approveBrand({
      requestId: request.id,
      action: 'approve',
      notes
    }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Brand approved successfully"
        });
        onOpenChange(false);
        setAction(null);
        setNotes('');
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to approve brand",
          variant: "destructive"
        });
      }
    });
  };

  const handleReject = () => {
    approveBrand({
      requestId: request.id,
      action: 'reject',
      notes: rejectReason
    }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Brand rejected successfully"
        });
        onOpenChange(false);
        setAction(null);
        setRejectReason('');
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to reject brand",
          variant: "destructive"
        });
      }
    });
  };

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Brand Request - {request.brand_name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Brand Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Brand Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Brand Name:</strong> {request.brand_name}</div>
              <div><strong>Email:</strong> {request.email}</div>
              <div><strong>Business Contact:</strong> {request.business_contact}</div>
              <div><strong>Business Niche:</strong> {request.business_niche}</div>
              <div><strong>Instagram:</strong> {request.instagram_handle || 'Not provided'}</div>
              <div><strong>Website:</strong> {request.website || 'Not provided'}</div>
              <div className="col-span-2"><strong>Applied:</strong> {new Date(request.created_at).toLocaleDateString()}</div>
            </div>
          </div>

          {!action && (
            <div className="flex gap-4">
              <Button
                onClick={() => setAction('approve')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Accept Brand
              </Button>
              <Button
                onClick={() => setAction('reject')}
                variant="destructive"
                className="flex-1"
              >
                Reject Brand
              </Button>
            </div>
          )}

          {action === 'approve' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="approval-notes">Admin Notes (Optional)</Label>
                <Textarea
                  id="approval-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about this brand approval"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleApprove}
                  disabled={isPending}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isPending ? "Approving..." : "Approve Brand"}
                </Button>
                <Button
                  onClick={() => setAction(null)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {action === 'reject' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="reject-reason">Rejection Reason</Label>
                <Textarea
                  id="reject-reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Please provide a reason for rejection"
                  required
                />
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleReject}
                  disabled={isPending || !rejectReason.trim()}
                  variant="destructive"
                >
                  {isPending ? "Rejecting..." : "Reject Brand"}
                </Button>
                <Button
                  onClick={() => setAction(null)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BrandReviewDialog;
