import React, { useState } from 'react';

interface ExplorePageProps {
  onBack: () => void;
}

type PostType = 'image' | 'video' | 'text' | 'poll';

interface Post {
  id: number;
  type: PostType;
  url?: string; // for images/videos
  thumbnail?: string; // for videos
  text?: string; // for text posts
  user: {
    name: string;
    avatar: string;
    handle: string;
  };
  likes: number;
  caption: string;
  gradient?: string; // for text posts background
}

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800',
    user: { name: 'Sarah J.', avatar: 'https://i.pravatar.cc/150?u=1', handle: '@sarah_cleanses' },
    likes: 124,
    caption: 'Day 3 of the extraction protocol. Feeling lighter than air! 🌿 #ninedays #detox',
  },
  {
    id: 2,
    type: 'text',
    text: 'The hardest part is starting. Once you are in the flow, the body knows exactly what to do.',
    gradient: 'from-purple-600 to-blue-600',
    user: { name: 'Mindful Mike', avatar: 'https://i.pravatar.cc/150?u=2', handle: '@mindful_mike' },
    likes: 89,
    caption: 'Morning reflection. Keep going everyone!',
  },
  {
    id: 3,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800',
    user: { name: 'Elena R.', avatar: 'https://i.pravatar.cc/150?u=3', handle: '@elena_eats_green' },
    likes: 256,
    caption: 'Meal prep done for Level 2. Look at these greens! 🥒🥬',
  },
  {
    id: 4,
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-meditation-in-nature-40899-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800',
    user: { name: 'Yoga with Jen', avatar: 'https://i.pravatar.cc/150?u=4', handle: '@jen_yogi' },
    likes: 412,
    caption: 'Movement is medicine. Gentle flow for Day 5.',
  },
  {
    id: 5,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1615478503562-ec2d8dd3e4db?auto=format&fit=crop&q=80&w=800',
    user: { name: 'Tom Cook', avatar: 'https://i.pravatar.cc/150?u=5', handle: '@chef_tom' },
    likes: 190,
    caption: 'Juicing session in full swing.',
  },
  {
    id: 6,
    type: 'text',
    text: 'POLL: How are you feeling on Day 4?\n\n⚡️ Energized (65%)\n😴 Tired (15%)\n🧘‍♀️ Balanced (20%)',
    gradient: 'from-orange-500 to-red-500',
    user: { name: 'Nine Days Official', avatar: 'https://i.pravatar.cc/150?u=9', handle: '@ninedays_app' },
    likes: 530,
    caption: 'Check in time! Let us know in the comments.',
  },
  {
    id: 7,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1604543501309-9d7c07b667e5?auto=format&fit=crop&q=80&w=800',
    user: { name: 'Lisa M.', avatar: 'https://i.pravatar.cc/150?u=7', handle: '@lisa_greens' },
    likes: 88,
    caption: 'Beautiful start to the morning.',
  },
  {
    id: 8,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80&w=800',
    user: { name: 'Dave K.', avatar: 'https://i.pravatar.cc/150?u=8', handle: '@dave_detox' },
    likes: 145,
    caption: 'Fresh haul from the farmers market. Support local!',
  },
  {
    id: 9,
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-fresh-green-vegetables-on-a-table-33922-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800',
    user: { name: 'Green Life', avatar: 'https://i.pravatar.cc/150?u=10', handle: '@green_life' },
    likes: 302,
    caption: 'Simplicity is key. 💚',
  },
];

const ExplorePage: React.FC<ExplorePageProps> = ({ onBack }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20 overflow-y-auto font-sans">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 mr-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold tracking-wide">COMMUNITY</h1>
        </div>
        <div className="flex gap-4">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
           </svg>
        </div>
      </div>

      {/* Stories / Highlights Bar (Horizontal Scroll) */}
      <div className="flex gap-4 overflow-x-auto p-4 no-scrollbar border-b border-white/5">
         {[1,2,3,4,5,6].map((i) => (
             <div key={i} className="flex flex-col items-center space-y-1 flex-shrink-0">
                 <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-red-500 to-purple-600">
                     <img 
                        src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                        alt="user" 
                        className="w-full h-full rounded-full border-2 border-gray-900 object-cover"
                     />
                 </div>
                 <span className="text-[10px] text-gray-300">User_{i}</span>
             </div>
         ))}
      </div>

      {/* Grid Wall */}
      <div className="grid grid-cols-3 gap-0.5 md:gap-1">
        {MOCK_POSTS.map((post) => (
          <div 
            key={post.id} 
            onClick={() => setSelectedPost(post)}
            className={`relative aspect-square group cursor-pointer overflow-hidden bg-gray-800 ${post.type === 'text' ? 'col-span-2 row-span-1 md:col-span-1' : ''}`}
          >
            {/* Content Render */}
            {post.type === 'image' && (
                <img src={post.url} alt="post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            )}
            {post.type === 'video' && (
                <>
                  <img src={post.thumbnail} alt="video thumb" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                  </div>
                </>
            )}
            {post.type === 'text' && (
                <div className={`w-full h-full bg-gradient-to-br ${post.gradient} p-4 flex items-center justify-center text-center`}>
                    <p className="text-xs md:text-sm font-bold line-clamp-4 drop-shadow-md">
                        "{post.text}"
                    </p>
                </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
               <div className="flex items-center text-white font-bold">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 fill-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                 </svg>
                 {post.likes}
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelectedPost(null)}>
          <div 
            className="bg-gray-900 w-full max-w-3xl max-h-[80vh] rounded-xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media Section */}
            <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative">
               {selectedPost.type === 'image' && (
                   <img src={selectedPost.url} className="max-h-[50vh] md:max-h-full w-full object-contain" alt="detail" />
               )}
               {selectedPost.type === 'video' && (
                   <video src={selectedPost.url} controls autoPlay loop className="max-h-[50vh] md:max-h-full w-full object-contain" />
               )}
               {selectedPost.type === 'text' && (
                   <div className={`w-full h-64 md:h-full bg-gradient-to-br ${selectedPost.gradient} flex items-center justify-center p-8 text-center`}>
                       <p className="text-xl md:text-2xl font-bold whitespace-pre-wrap">{selectedPost.text}</p>
                   </div>
               )}
            </div>

            {/* Comments / Info Section */}
            <div className="w-full md:w-2/5 flex flex-col h-[40vh] md:h-auto">
                {/* User Header */}
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={selectedPost.user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                        <div>
                            <p className="text-sm font-bold">{selectedPost.user.name}</p>
                            <p className="text-xs text-gray-400">{selectedPost.user.handle}</p>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                         </svg>
                    </button>
                </div>

                {/* Scrollable Comments */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="text-sm">
                        <span className="font-bold mr-2">{selectedPost.user.handle}</span>
                        {selectedPost.caption}
                        <p className="text-xs text-gray-500 mt-1">2h ago</p>
                    </div>
                    
                    {/* Fake Comments */}
                    <div className="text-sm">
                        <span className="font-bold mr-2 text-gray-300">user_wellness</span>
                        Looks amazing! Keep it up 🔥
                    </div>
                     <div className="text-sm">
                        <span className="font-bold mr-2 text-gray-300">clean_eats_joe</span>
                        Is this from the Level 2 plan?
                    </div>
                </div>

                {/* Action Bar */}
                <div className="p-4 border-t border-gray-800 bg-gray-900">
                    <div className="flex gap-4 mb-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                         </svg>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-blue-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                         </svg>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-green-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                         </svg>
                    </div>
                    <p className="font-bold text-sm">{selectedPost.likes} likes</p>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;