
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useApproveCreator } from '@/hooks/useAdmin';
import { useToast } from '@/hooks/use-toast';

interface CreatorReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: any;
}

const CreatorReviewDialog = ({ open, onOpenChange, request }: CreatorReviewDialogProps) => {
  const [enrichmentData, setEnrichmentData] = useState({
    follower_count: '',
    total_posts: '',
    avg_likes: '',
    avg_comments: '',
    engagement_rate: '',
    notes: ''
  });
  const [rejectReason, setRejectReason] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  
  const { mutate: approveCreator, isPending } = useApproveCreator();
  const { toast } = useToast();

  const handleApprove = () => {
    const data = {
      follower_count: parseInt(enrichmentData.follower_count) || 0,
      total_posts: parseInt(enrichmentData.total_posts) || 0,
      avg_likes: parseInt(enrichmentData.avg_likes) || 0,
      avg_comments: parseInt(enrichmentData.avg_comments) || 0,
      engagement_rate: parseFloat(enrichmentData.engagement_rate) || 0,
      notes: enrichmentData.notes
    };

    approveCreator({
      requestId: request.id,
      action: 'approve',
      enrichmentData: data
    }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Creator approved successfully"
        });
        onOpenChange(false);
        setAction(null);
        setEnrichmentData({
          follower_count: '',
          total_posts: '',
          avg_likes: '',
          avg_comments: '',
          engagement_rate: '',
          notes: ''
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to approve creator",
          variant: "destructive"
        });
      }
    });
  };

  const handleReject = () => {
    approveCreator({
      requestId: request.id,
      action: 'reject',
      enrichmentData: { notes: rejectReason }
    }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Creator rejected successfully"
        });
        onOpenChange(false);
        setAction(null);
        setRejectReason('');
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to reject creator",
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
          <DialogTitle>Review Creator Request - {request.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Creator Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Creator Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Name:</strong> {request.name}</div>
              <div><strong>Email:</strong> {request.email}</div>
              <div><strong>Instagram:</strong> {request.instagram_handle}</div>
              <div><strong>Mobile:</strong> {request.mobile_number}</div>
              <div><strong>City:</strong> {request.city}</div>
              <div><strong>State:</strong> {request.state}</div>
              <div><strong>Niche:</strong> {request.content_niche}</div>
              <div><strong>Applied:</strong> {new Date(request.created_at).toLocaleDateString()}</div>
            </div>
          </div>

          {!action && (
            <div className="flex gap-4">
              <Button
                onClick={() => setAction('approve')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Review & Accept
              </Button>
              <Button
                onClick={() => setAction('reject')}
                variant="destructive"
                className="flex-1"
              >
                Reject
              </Button>
            </div>
          )}

          {action === 'approve' && (
            <div className="space-y-4">
              <h3 className="font-semibold">Add Creator Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="followers">Follower Count</Label>
                  <Input
                    id="followers"
                    type="number"
                    value={enrichmentData.follower_count}
                    onChange={(e) => setEnrichmentData(prev => ({...prev, follower_count: e.target.value}))}
                    placeholder="Enter follower count"
                  />
                </div>
                <div>
                  <Label htmlFor="posts">Total Posts</Label>
                  <Input
                    id="posts"
                    type="number"
                    value={enrichmentData.total_posts}
                    onChange={(e) => setEnrichmentData(prev => ({...prev, total_posts: e.target.value}))}
                    placeholder="Enter total posts"
                  />
                </div>
                <div>
                  <Label htmlFor="likes">Average Likes</Label>
                  <Input
                    id="likes"
                    type="number"
                    value={enrichmentData.avg_likes}
                    onChange={(e) => setEnrichmentData(prev => ({...prev, avg_likes: e.target.value}))}
                    placeholder="Enter average likes"
                  />
                </div>
                <div>
                  <Label htmlFor="comments">Average Comments</Label>
                  <Input
                    id="comments"
                    type="number"
                    value={enrichmentData.avg_comments}
                    onChange={(e) => setEnrichmentData(prev => ({...prev, avg_comments: e.target.value}))}
                    placeholder="Enter average comments"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="engagement">Engagement Rate (%)</Label>
                  <Input
                    id="engagement"
                    type="number"
                    step="0.01"
                    value={enrichmentData.engagement_rate}
                    onChange={(e) => setEnrichmentData(prev => ({...prev, engagement_rate: e.target.value}))}
                    placeholder="Enter engagement rate (e.g., 3.5)"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes">Admin Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={enrichmentData.notes}
                    onChange={(e) => setEnrichmentData(prev => ({...prev, notes: e.target.value}))}
                    placeholder="Add any notes about this creator"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleApprove}
                  disabled={isPending}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isPending ? "Approving..." : "Approve Creator"}
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
                  {isPending ? "Rejecting..." : "Reject Creator"}
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

export default CreatorReviewDialog;
