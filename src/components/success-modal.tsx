import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import YellowTick from "./yellow-tick";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewInsights: () => void;
}

export function SuccessModal({
  open,
  onOpenChange,
  onViewInsights,
}: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <YellowTick />
          </div>
          <DialogTitle className="text-center text-2xl">
            Brand Created Successfully!
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Your brand has been created successfully. You can now view your
            website's insights and analytics.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center pt-4">
          <Button onClick={onViewInsights} className="w-full">
            View Website Insights
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
