import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast-notification';

export default function ToastDemo() {
  return (
    <div className="min-h-screen bg-[#f6f8f6] flex items-center justify-center p-6">
      <div className="bg-white rounded-xl border border-gray-100/50 p-8 max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Toast Notifications</h1>
        <p className="text-sm text-gray-500 mb-6">Test the notification system</p>
        
        <div className="space-y-3">
          <Button
            onClick={() => toast.success('Success', 'Your account has been saved')}
            className="w-full bg-[#2d6a4f] hover:bg-[#1b4332]"
          >
            Show Success Toast
          </Button>
          
          <Button
            onClick={() => toast.error('Error', 'Your email address is invalid')}
            variant="destructive"
            className="w-full"
          >
            Show Error Toast
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">Usage in your code:</h3>
          <pre className="text-xs text-gray-600 whitespace-pre-wrap">
{`import { toast } from '@/components/ui/toast-notification';

// Show success
toast.success('Success', 'Message here');

// Show error
toast.error('Error', 'Message here');`}
          </pre>
        </div>
      </div>
    </div>
  );
}