'use client';

import React, { useState, useEffect, useContext, createContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChevronDown, PlusCircle, Calendar, Send, BarChart2, MessageSquare, Settings as SettingsIcon, HelpCircle, Bell, User, ExternalLink, Trash2, Edit, Search, Eye, EyeOff, LayoutDashboard, TrendingUp, Image as ImageIcon, Video as VideoIcon, Copy, X } from 'lucide-react';

// --- CONTEXT FOR STATE MANAGEMENT ---
const AppContext = createContext();

// --- MOCK DATA ---
const initialPosts = [
  { id: 1, content: 'Emotional intelligence is the cornerstone of leadership. How do you cultivate it in your team?', status: 'posted', scheduledAt: '2024-07-15T09:00:00.000Z', stats: { likes: 128, comments: 42, shares: 19, reach: 4500 } },
  { id: 2, content: 'Just finished a great coaching session on self-awareness with a young entrepreneur. The future is bright! #coaching #emotionalintelligence', status: 'posted', scheduledAt: '2024-07-17T14:30:00.000Z', stats: { likes: 98, comments: 25, shares: 12, reach: 3200 } },
  { id: 3, content: 'Understanding your "why" is the first step to unlocking your potential. What drives you?', status: 'scheduled', scheduledAt: '2024-07-20T11:00:00.000Z', stats: null },
  { id: 4, content: 'New blog post coming this Friday on navigating workplace conflicts with empathy. #communication #empathy', status: 'draft', scheduledAt: null, stats: null },
  { id: 5, content: 'The power of active listening cannot be overstated. It builds trust and fosters genuine connection.', status: 'scheduled', scheduledAt: '2024-07-22T16:00:00.000Z', stats: null },
];

const analyticsData = {
    reach: [
        { name: 'Jan', value: 21000 }, { name: 'Feb', value: 25000 }, { name: 'Mar', value: 23000 },
        { name: 'Apr', value: 28000 }, { name: 'May', value: 32000 }, { name: 'Jun', value: 35000 },
    ],
    engagement: [
        { name: 'Jan', value: 1200 }, { name: 'Feb', value: 1500 }, { name: 'Mar', value: 1400 },
        { name: 'Apr', value: 1800 }, { name: 'May', value: 2100 }, { name: 'Jun', value: 2400 },
    ],
    bestPerformingPosts: [
        { id: 1, content: 'Emotional intelligence is the cornerstone...', likes: 128, comments: 42 },
        { id: 2, content: 'Just finished a great coaching session...', likes: 98, comments: 25 },
        { id: 6, content: 'The subtle art of giving feedback...', likes: 95, comments: 31 },
    ],
    optimalPostingTimes: ['Mon 9:00 AM', 'Wed 11:30 AM', 'Fri 2:00 PM'],
};

const engagementInbox = [
    { id: 1, postContent: 'Emotional intelligence is the cornerstone...', author: 'John Doe', comment: 'Great insight! How do you measure EI growth?', replied: false },
    { id: 2, postContent: 'Emotional intelligence is the cornerstone...', author: 'Jane Smith', comment: 'Totally agree, this is a skill we all need.', replied: true },
    { id: 3, postContent: 'Just finished a great coaching session...', author: 'Peter Jones', comment: 'Sounds rewarding! Keep up the great work.', replied: false },
];

// --- LOGIN PAGE COMPONENT ---
const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'coach@example.com' && password === 'password') {
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            onLogin({ name: 'Alex Chen', email: 'alex.chen@email.com', avatar: `https://i.pravatar.cc/150?u=alex` });
        } else {
            setError('Invalid credentials. Use coach@example.com and password.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Influen<span className="text-indigo-600">ce</span></h1>
                    <p className="text-gray-500">Log in to your account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="you@example.com" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="••••••••" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                        </div>
                    </div>
                    {error && <p className="text-sm text-center text-red-500">{error}</p>}
                    <div>
                        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Dashboard Component ---
const DashboardApp = () => {
  const [page, setPage] = useState('dashboard');
  const [posts, setPosts] = useState(initialPosts);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useContext(AppContext);

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openComposer = (post = null) => {
      setEditingPost(post);
      setIsComposerOpen(true);
  };

  const closeComposer = () => {
      setIsComposerOpen(false);
      setEditingPost(null);
  };

  const handleSavePost = (post) => {
      if (post.id) {
          setPosts(posts.map(p => p.id === post.id ? post : p));
      } else {
          const newPost = { ...post, id: Date.now() };
          setPosts([newPost, ...posts]);
      }
      closeComposer();
  };

  const appContextValue = { user, posts, setPosts, analyticsData, engagementInbox, openComposer, logout, setPage, searchQuery, setSearchQuery };

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="flex h-screen bg-gray-100 font-sans">
        <Sidebar isOpen={isSidebarOpen} setPage={setPage} currentPage={page} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6 lg:p-8">
            <PageContent currentPage={page} />
          </main>
        </div>
        {isComposerOpen && <PostComposer post={editingPost} onSave={handleSavePost} onCancel={closeComposer} />}
      </div>
    </AppContext.Provider>
  );
};


// --- MAIN APP COMPONENT ---
export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };
    
    const authContextValue = { user, logout: handleLogout };

    if (!isAuthenticated) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <AppContext.Provider value={authContextValue}>
            <DashboardApp />
        </AppContext.Provider>
    );
}


// --- LAYOUT COMPONENTS ---
const Sidebar = ({ isOpen, setPage, currentPage }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'content', icon: Calendar, label: 'Content' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'engagement', icon: MessageSquare, label: 'Engagement' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
    { id: 'support', icon: HelpCircle, label: 'Support' },
  ];
  const { user } = useContext(AppContext);

  return (
    <aside className={`bg-white text-gray-800 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col border-r border-gray-200`}>
        <div className="flex items-center justify-center h-20 border-b border-gray-200">
             <h1 className={`font-bold text-2xl text-indigo-600 ${!isOpen && 'hidden'}`}>Influen<span className="text-blue-500">ce</span></h1>
             <img src="https://placehold.co/40x40/6366f1/ffffff?text=I" alt="logo" className={`h-10 w-10 ${isOpen && 'hidden'}`} />
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
            {navItems.map(item => (
                <a key={item.id} href="#" onClick={(e) => { e.preventDefault(); setPage(item.id); }} className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${currentPage === item.id ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-gray-200'}`}>
                    <item.icon className="h-6 w-6" />
                    <span className={`ml-4 font-medium ${!isOpen && 'hidden'}`}>{item.label}</span>
                </a>
            ))}
        </nav>
        <div className="px-4 py-4 border-t border-gray-200">
             <a href="#" onClick={(e) => { e.preventDefault(); setPage('settings'); }} className={`flex items-center p-3 rounded-lg transition-colors duration-200 hover:bg-gray-200`}>
                <User className="h-6 w-6" />
                <span className={`ml-4 font-medium ${!isOpen && 'hidden'}`}>{user?.name}</span>
             </a>
        </div>
    </aside>
  );
};

const Header = ({ toggleSidebar }) => {
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const { user, logout, openComposer, setPage, searchQuery, setSearchQuery } = useContext(AppContext);

  return (
    <header className="flex justify-between items-center h-20 bg-white shadow-sm px-6 border-b border-gray-200 z-10">
        <div className="flex items-center">
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                 <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="relative ml-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full lg:w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
            </div>
        </div>
      <div className="flex items-center space-x-5">
        <button onClick={() => openComposer()} className="hidden sm:flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <PlusCircle className="h-5 w-5 mr-2" />
          Create Post
        </button>
        <div className="relative">
            <button onClick={() => setNotificationsOpen(!isNotificationsOpen)} className="text-gray-500 hover:text-gray-700 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="py-2">
                        <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">Notifications</div>
                        <a href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100"><p className="text-gray-600 text-sm mx-2"><span className="font-bold">New comment</span> on your post about emotional intelligence.</p></a>
                        <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-100"><p className="text-gray-600 text-sm mx-2">Your scheduled post was published.</p></a>
                    </div>
                </div>
            )}
        </div>
        <div className="relative">
            <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2">
                <img className="h-10 w-10 rounded-full object-cover" src={user?.avatar} alt="User avatar" />
                <div className="hidden md:block text-left"><p className="font-semibold text-sm text-gray-800">{user?.name}</p><p className="text-xs text-gray-500">Coach</p></div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            {isProfileMenuOpen && (
                 <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    <a href="#" onClick={(e) => { e.preventDefault(); setPage('settings'); setProfileMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setPage('settings'); setProfileMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Settings</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Logout</a>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};


// --- PAGE CONTENT ROUTER ---
const PageContent = ({ currentPage }) => {
  switch (currentPage) {
    case 'dashboard': return <Dashboard />;
    case 'content': return <ContentCalendar />;
    case 'analytics': return <Analytics />;
    case 'engagement': return <Engagement/>;
    case 'settings': return <SettingsPage />;
    case 'support': return <SupportPage />;
    default: return <Dashboard />;
  }
};

// --- CORE FEATURE COMPONENTS ---
const Dashboard = () => {
  const { posts, analyticsData } = useContext(AppContext);
  const scheduledPosts = posts.filter(p => p.status === 'scheduled').slice(0, 3);
  
  const overviewMetrics = [
    { title: 'Total Reach (30d)', value: '42.5K', change: '+15.2%', icon: BarChart2, color: 'text-green-500' },
    { title: 'Engagement (30d)', value: '2.8K', change: '+8.9%', icon: MessageSquare, color: 'text-green-500' },
    { title: 'Posts This Week', value: '5', change: '-2', icon: Send, color: 'text-red-500' },
    { title: 'Followers', value: '7,832', change: '+128', icon: User, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewMetrics.map(metric => (
          <div key={metric.title} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4">
              <div className={`p-3 rounded-full bg-indigo-100 ${metric.color}`}><metric.icon size={24} className="text-indigo-600"/></div>
              <div><p className="text-sm text-gray-500">{metric.title}</p><p className="text-2xl font-bold text-gray-800">{metric.value}</p><p className={`text-xs font-semibold ${metric.color}`}>{metric.change}</p></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Performance Overview (Last 6 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.reach}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tick={{ fill: '#6B7280' }} /><YAxis tick={{ fill: '#6B7280' }} /><Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', borderColor: '#E5E7EB' }}/><Legend /><Line type="monotone" dataKey="value" name="Reach" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Posts</h2>
          <div className="space-y-4">
            {scheduledPosts.length > 0 ? scheduledPosts.map(post => (
              <div key={post.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 truncate">{post.content}</p>
                <p className="text-xs text-indigo-600 font-semibold mt-2">{new Date(post.scheduledAt).toLocaleString()}</p>
              </div>
            )) : <p className="text-gray-500">No upcoming posts scheduled.</p>}
            <button className="w-full mt-2 text-indigo-600 font-semibold hover:text-indigo-800">View all</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentCalendar = () => {
    const { posts, setPosts, openComposer, searchQuery } = useContext(AppContext);

    const filteredPosts = posts.filter(post => post.content.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleDeletePost = (postId) => { if (window.confirm('Are you sure you want to delete this post?')) setPosts(posts.filter(p => p.id !== postId)) };

    const handleDuplicatePost = (post) => { openComposer({ ...post, id: null, status: 'draft', scheduledAt: null }) };

    const PostCard = ({ post }) => (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 space-y-3">
            <p className="text-gray-700 text-sm leading-relaxed">{post.content}</p>
            <div className="flex justify-between items-center text-xs pt-2 border-t">
                <span className="font-semibold text-indigo-600">
                    {post.scheduledAt ? new Date(post.scheduledAt).toLocaleString() : 'No date'}
                </span>
                <div className="flex items-center space-x-3">
                    <button onClick={() => handleDuplicatePost(post)} title="Duplicate Post" className="text-gray-500 hover:text-green-500"><Copy size={16}/></button>
                    <button onClick={() => openComposer(post)} title="Edit Post" className="text-gray-500 hover:text-blue-500"><Edit size={16}/></button>
                    <button onClick={() => handleDeletePost(post.id)} title="Delete Post" className="text-gray-500 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Content</h1>
                <button onClick={() => openComposer()} className="flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md"><PlusCircle className="h-5 w-5 mr-2" />Schedule Post</button>
            </div>
            {filteredPosts.length === 0 && searchQuery && (<div className="text-center py-10"><p className="text-gray-600">No posts match your search for "{searchQuery}".</p></div>)}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><h2 className="text-xl font-semibold text-gray-700 mb-4">Scheduled</h2><div className="space-y-4">{filteredPosts.filter(p => p.status === 'scheduled').map(p => <PostCard key={p.id} post={p} />)}</div></div>
                <div><h2 className="text-xl font-semibold text-gray-700 mb-4">Drafts</h2><div className="space-y-4">{filteredPosts.filter(p => p.status === 'draft').map(p => <PostCard key={p.id} post={p} />)}</div></div>
                <div><h2 className="text-xl font-semibold text-gray-700 mb-4">Posted</h2><div className="space-y-4">{filteredPosts.filter(p => p.status === 'posted').map(p => <PostCard key={p.id} post={p} />)}</div></div>
            </div>
        </div>
    );
};


const PostComposer = ({ post, onSave, onCancel }) => {
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('scheduled');
    const [scheduledAt, setScheduledAt] = useState('');
    const [attachedFile, setAttachedFile] = useState(null);

    useEffect(() => {
        if (post) {
            setContent(post.content || '');
            setStatus(post.status || 'scheduled');
            setScheduledAt(post.scheduledAt ? new Date(post.scheduledAt).toISOString().slice(0, 16) : '');
            setAttachedFile(post.attachedFile || null);
        } else {
            setContent('');
            setStatus('scheduled');
            setScheduledAt('');
            setAttachedFile(null);
        }
    }, [post]);
    
    const handleAIGenerate = () => {
      setContent("Generating AI content... Please wait.");
      setTimeout(() => {
          setContent("AI-Generated: The ability to manage your emotions and understand the emotions of others is a superpower in today's workplace. #EmotionalIntelligence #CareerGrowth #YoungProfessionals");
      }, 1500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ id: post?.id, content, status, scheduledAt: status === 'scheduled' ? new Date(scheduledAt).toISOString() : null, attachedFile });
    };
    
    const handleFileAttach = (type) => { setAttachedFile({name: `${type}_${Date.now()}.${type === 'image' ? 'jpg' : 'mp4'}`, type})};

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">{post?.id ? 'Edit Post' : 'Create Post'}</h2>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="e.g., Write a post about the importance of self-awareness for young leaders, including 3 practical tips and relevant hashtags." className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    <div className="flex items-center space-x-4">
                        <button type="button" onClick={() => handleFileAttach('image')} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"><ImageIcon size={16}/> Add Photo</button>
                        <button type="button" onClick={() => handleFileAttach('video')} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"><VideoIcon size={16}/> Add Video</button>
                    </div>
                    {attachedFile && (
                        <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-md text-sm">
                            <span className="text-indigo-700 font-medium truncate">{attachedFile.type === 'image' ? 'Image: ' : 'Video: '}{attachedFile.name}</span>
                            <button onClick={() => setAttachedFile(null)} className="text-indigo-500 hover:text-indigo-700"><X size={16}/></button>
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option value="scheduled">Scheduled</option>
                                <option value="draft">Save as Draft</option>
                            </select>
                        </div>
                        {status === 'scheduled' && (
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Schedule Date & Time</label>
                                <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" required />
                            </div>
                        )}
                    </div>
                     <div className="pt-4 border-t border-gray-200 space-y-4">
                         <details className="p-3 bg-gray-50 rounded-lg cursor-pointer">
                            <summary className="font-medium text-sm text-gray-600">LinkedIn Post Best Practices</summary>
                            <ul className="text-xs text-gray-600 mt-2 space-y-1 list-disc list-inside">
                                <li>Start with a strong hook to grab attention.</li>
                                <li>Provide value and insights, don't just sell.</li>
                                <li>Keep paragraphs short (1-2 sentences).</li>
                                <li>Use 3-5 relevant hashtags.</li>
                                <li>Tag relevant people or companies.</li>
                                <li>End with a question to encourage comments.</li>
                            </ul>
                        </details>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <button type="button" onClick={handleAIGenerate} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">✨ Generate with AI</button>
                            <div className="flex gap-3">
                                <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">{post?.id ? 'Save Changes' : 'Schedule Post'}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Analytics = () => {
    const { analyticsData } = useContext(AppContext);
    return (
      <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md"><h2 className="text-xl font-semibold text-gray-700 mb-4">Total Reach</h2><ResponsiveContainer width="100%" height={300}><BarChart data={analyticsData.reach}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tick={{ fill: '#6B7280' }} /><YAxis tick={{ fill: '#6B7280' }} /><Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', borderColor: '#E5E7EB' }}/><Legend /><Bar dataKey="value" fill="#4f46e5" name="Reach" /></BarChart></ResponsiveContainer></div>
              <div className="bg-white p-6 rounded-xl shadow-md"><h2 className="text-xl font-semibold text-gray-700 mb-4">Total Engagement</h2><ResponsiveContainer width="100%" height={300}><LineChart data={analyticsData.engagement}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name" tick={{ fill: '#6B7280' }}/><YAxis tick={{ fill: '#6B7280' }}/><Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', borderColor: '#E5E7EB' }}/><Legend /><Line type="monotone" dataKey="value" name="Engagement" stroke="#10b981" strokeWidth={2}/></LineChart></ResponsiveContainer></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Best Performing Posts</h2>
              <ul className="space-y-3">{analyticsData.bestPerformingPosts.map(post => (<li key={post.id} className="p-3 bg-gray-50 rounded-lg"><p className="text-sm text-gray-800 truncate">{post.content}</p><div className="flex justify-end space-x-4 text-xs mt-1"><span>Likes: <span className="font-bold">{post.likes}</span></span><span>Comments: <span className="font-bold">{post.comments}</span></span></div></li>))}</ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Optimal Posting Times</h2>
              <div className="flex flex-wrap gap-3">{analyticsData.optimalPostingTimes.map(time => (<span key={time} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">{time}</span>))}</div>
              <p className="text-xs text-gray-500 mt-4">Based on historical engagement data of your audience.</p>
            </div>
          </div>
      </div>
    );
};

const Engagement = () => {
    const { engagementInbox } = useContext(AppContext);
    const [inbox, setInbox] = useState(engagementInbox);
    const toggleReplied = (id) => setInbox(inbox.map(item => item.id === id ? { ...item, replied: !item.replied } : item));
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Engagement Inbox</h1>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b"><h2 className="text-xl font-semibold text-gray-700">Recent Comments</h2><p className="text-sm text-gray-500">Respond to build relationships and boost credibility.</p></div>
                <ul className="divide-y divide-gray-200">
                    {inbox.map(item => (
                        <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 italic">On post: "{item.postContent}"</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <img src={`https://i.pravatar.cc/150?u=${item.author}`} className="h-8 w-8 rounded-full"/>
                                        <div><p className="font-semibold text-gray-800">{item.author}</p><p className="text-gray-600">{item.comment}</p></div>
                                    </div>
                                </div>
                                <div className="ml-4 flex flex-col items-end space-y-2">
                                    <button onClick={() => toggleReplied(item.id)} className={`px-3 py-1 text-xs font-semibold rounded-full ${item.replied ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{item.replied ? 'Replied' : 'Mark as Replied'}</button>
                                     <a href="#" className="flex items-center text-sm text-indigo-600 hover:underline">Reply on LinkedIn <ExternalLink size={14} className="ml-1"/></a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const SettingsPage = () => {
    const { user } = useContext(AppContext);
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
            <div className="bg-white p-6 rounded-xl shadow-md"><h2 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-4">Account Information</h2><div className="space-y-4"><div className="flex flex-col md:flex-row items-center"><label className="w-full md:w-1/3 text-gray-600 font-medium">Name</label><input type="text" defaultValue={user?.name} className="flex-1 mt-1 md:mt-0 p-2 border border-gray-300 rounded-md"/></div><div className="flex flex-col md:flex-row items-center"><label className="w-full md:w-1/3 text-gray-600 font-medium">Email</label><input type="email" defaultValue={user?.email} className="flex-1 mt-1 md:mt-0 p-2 border border-gray-300 rounded-md"/></div><div className="flex justify-end"><button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Save Changes</button></div></div></div>
            <div className="bg-white p-6 rounded-xl shadow-md"><h2 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-4">LinkedIn Account Safety</h2><div className="space-y-4"><div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg"><p className="text-sm text-yellow-700"><strong>Warning:</strong> Automating LinkedIn activity carries risks. Our human-like simulation helps, but always use automation responsibly. <a href="#" className="font-bold underline">Learn more</a>.</p></div><div className="flex flex-col md:flex-row items-center"><label htmlFor="post-frequency" className="w-full md:w-1/3 text-gray-600 font-medium">Post Frequency</label><select id="post-frequency" className="flex-1 mt-1 md:mt-0 p-2 border border-gray-300 rounded-md"><option>Conservative (Recommended)</option><option>Moderate</option><option>Aggressive</option></select></div><div className="flex justify-end"><button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Update Safety Settings</button></div></div></div>
            <div className="bg-white p-6 rounded-xl shadow-md"><h2 className="text-xl font-semibold text-gray-700 border-b pb-3 mb-4">Integrations</h2><div className="space-y-4"><div className="flex justify-between items-center p-4 border rounded-lg"><div><p className="font-semibold">LinkedIn</p><p className="text-sm text-green-600">Connected as {user?.name}</p></div><button className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600">Disconnect</button></div><div className="flex justify-between items-center p-4 border rounded-lg"><div><p className="font-semibold">HubSpot CRM</p><p className="text-sm text-gray-500">Not connected</p></div><button className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700">Connect</button></div></div></div>
        </div>
    );
};

const SupportPage = () => {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Support & Help</h1>
             <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                    <details className="p-3 bg-gray-50 rounded-lg cursor-pointer"><summary className="font-medium">Is my LinkedIn account safe?</summary><p className="text-sm text-gray-600 mt-2">We prioritize account safety with human-like activity simulation and geolocation tracking. However, all automation carries some risk. We recommend the 'Conservative' posting frequency.</p></details>
                     <details className="p-3 bg-gray-50 rounded-lg cursor-pointer"><summary className="font-medium">How does the AI content generator work?</summary><p className="text-sm text-gray-600 mt-2">Our AI uses advanced language models to generate relevant and engaging post ideas based on your niche. You can always edit and personalize the content before scheduling.</p></details>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Support</h2>
                <form className="space-y-4">
                    <select className="w-full p-2 border border-gray-300 rounded-md"><option>General Inquiry</option><option>Technical Issue</option><option>Billing Question</option></select>
                    <textarea placeholder="Describe your issue..." className="w-full h-32 p-2 border border-gray-300 rounded-md"></textarea>
                    <div className="flex justify-end"><button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Submit Ticket</button></div>
                </form>
            </div>
        </div>
    );
};
