import React from 'react';

const LeadForm: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] animate-in fade-in zoom-in duration-500">
      <div className="bg-white p-2 rounded-xl shadow-2xl border-4 border-yellow-400 max-w-2xl w-full">
        <img 
          src="https://uploads.teachablecdn.com/attachments/a6e68356422c4e43913d4b4c6865761b.png" 
          alt="Chong Wee Soon - Go TAX Director Contact Card" 
          className="w-full h-auto rounded-lg"
        />
        <div className="text-center mt-4 pb-2">
             <p className="text-sm text-gray-500">
                Scan QR code or save this card to contact us.
             </p>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;