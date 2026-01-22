import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function DemoFeedback() {
  const mockUser = {
    full_name: 'Alex Johnson',
    email: 'alex.johnson@university.edu'
  };

  const [formData, setFormData] = useState({
    easyToUnderstand: '',
    easyToUse: '',
    likeProduct: '',
    wouldUse: '',
    improvements: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.easyToUnderstand || !formData.easyToUse || !formData.likeProduct || !formData.wouldUse) {
      toast.error('Please answer all required questions');
      return;
    }

    // Submit feedback
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
    toast.success('Thank you for your feedback!');
  };

  if (submitted) {
    return (
      <AppLayout user={mockUser} title="Demo Feedback" breadcrumb="Dashboard / Demo Feedback">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white border-gray-100 text-center py-12">
              <CardContent>
                <div className="w-16 h-16 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#2d6a4f]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
                <p className="text-gray-600 mb-6">Your feedback helps us make QBtron better for students.</p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="text-[#2d6a4f] border-[#2d6a4f]"
                >
                  Submit another response
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout user={mockUser} title="Demo Feedback" breadcrumb="Dashboard / Demo Feedback">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-white border-gray-100">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-[#2d6a4f]" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Help us improve QBtron
                </CardTitle>
              </div>
              <p className="text-gray-600">
                Answer a few quick questions about your demo experience.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Question 1 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium text-gray-900">
                    1. Was the product easy to understand when you first started using it? <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup 
                    value={formData.easyToUnderstand} 
                    onValueChange={(value) => setFormData({...formData, easyToUnderstand: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="understand-yes" />
                      <Label htmlFor="understand-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="somewhat" id="understand-somewhat" />
                      <Label htmlFor="understand-somewhat" className="font-normal cursor-pointer">Somewhat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="understand-no" />
                      <Label htmlFor="understand-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 2 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium text-gray-900">
                    2. Would you choose this product over how you currently manage your tasks? <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup 
                    value={formData.easyToUse} 
                    onValueChange={(value) => setFormData({...formData, easyToUse: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="choose-yes" />
                      <Label htmlFor="choose-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="choose-maybe" />
                      <Label htmlFor="choose-maybe" className="font-normal cursor-pointer">Maybe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="choose-no" />
                      <Label htmlFor="choose-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 3 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium text-gray-900">
                    3. Do you like this product? <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup 
                    value={formData.likeProduct} 
                    onValueChange={(value) => setFormData({...formData, likeProduct: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="like-yes" />
                      <Label htmlFor="like-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="okay" id="like-okay" />
                      <Label htmlFor="like-okay" className="font-normal cursor-pointer">It's okay</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="like-no" />
                      <Label htmlFor="like-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 4 */}
                <div className="space-y-3">
                  <Label className="text-base font-medium text-gray-900">
                    4. Would you be willing to use this product regularly as a student? <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup 
                    value={formData.wouldUse} 
                    onValueChange={(value) => setFormData({...formData, wouldUse: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="would-yes" />
                      <Label htmlFor="would-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="would-maybe" />
                      <Label htmlFor="would-maybe" className="font-normal cursor-pointer">Maybe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="would-no" />
                      <Label htmlFor="would-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 5 - Optional */}
                <div className="space-y-3">
                  <Label htmlFor="improvements" className="text-base font-medium text-gray-900">
                    5. What is one thing that confused you or could be improved? <span className="text-gray-400 text-sm">(optional)</span>
                  </Label>
                  <Textarea
                    id="improvements"
                    placeholder="Share one thing that could be better..."
                    value={formData.improvements}
                    onChange={(e) => setFormData({...formData, improvements: e.target.value})}
                    className="min-h-[80px]"
                  />
                </div>

                <Button 
                  type="submit"
                  className="bg-[#2d6a4f] hover:bg-[#1b4332] text-white px-8 py-3 w-full sm:w-auto"
                >
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}