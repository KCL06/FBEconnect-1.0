import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function VideoCall() {
  const { roomId } = useParams<{ roomId: string }>();
  const { profile } = useAuth();
  const navigate = useNavigate();

  const myMeeting = async (element: HTMLDivElement) => {
    if (!element || !roomId) return;
    
    // In a real app, you would fetch a token securely from a backend
    // For this implementation, we use the generateKitTokenForTest utility 
    // which requires exposing the Server Secret to the client (okay for prototyping/development)
    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret || isNaN(appID)) {
      toast.error("Video Call keys are missing. Please add them to your .env file.");
      return;
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      profile?.id || Date.now().toString(),
      profile?.full_name || "Guest User"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url: window.location.origin + window.location.pathname,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls
      },
      showPreJoinView: true,
      onLeaveRoom: () => {
        navigate(-1); // Go back when hanging up
      },
      showScreenSharingButton: true,
    });
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Custom Header so they can escape if they want */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-white/80 hover:text-white px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Exit Call</span>
        </button>
      </div>

      {/* ZegoCloud UI Container */}
      <div 
        className="w-full h-full"
        ref={myMeeting}
      />
    </div>
  );
}
