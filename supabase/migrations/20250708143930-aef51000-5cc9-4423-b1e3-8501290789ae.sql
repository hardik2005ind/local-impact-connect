
-- Create enum types
CREATE TYPE user_role AS ENUM ('creator', 'brand', 'admin');
CREATE TYPE application_status AS ENUM ('pending', 'accepted', 'rejected', 'ongoing', 'completed');
CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'closed', 'completed');
CREATE TYPE reward_type AS ENUM ('cash', 'barter', 'both');

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    role user_role NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create creators table
CREATE TABLE creators (
    id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    instagram_handle VARCHAR(100),
    mobile_number VARCHAR(20),
    content_niche VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    state VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    bio TEXT,
    about TEXT,
    latest_posts_links TEXT[],
    follower_count INTEGER DEFAULT 0,
    total_posts INTEGER DEFAULT 0,
    avg_likes INTEGER DEFAULT 0,
    avg_comments INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00,
    profile_picture_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    portfolio_links TEXT[],
    campaign_tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create brands table
CREATE TABLE brands (
    id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
    brand_name VARCHAR(255) NOT NULL,
    business_contact VARCHAR(255),
    business_niche VARCHAR(100),
    instagram_handle VARCHAR(100),
    website VARCHAR(255),
    about TEXT,
    logo_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campaigns table
CREATE TABLE campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    reward_type reward_type NOT NULL,
    reward_details TEXT,
    target_city VARCHAR(100) NOT NULL,
    target_niche VARCHAR(100),
    deliverables TEXT NOT NULL,
    hashtags TEXT[],
    deadline DATE,
    status campaign_status DEFAULT 'draft',
    max_applicants INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campaign applications table
CREATE TABLE campaign_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE NOT NULL,
    creator_id UUID REFERENCES creators(id) ON DELETE CASCADE NOT NULL,
    status application_status DEFAULT 'pending',
    application_message TEXT,
    admin_notes TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, creator_id)
);

-- Create messages table for in-app chat
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create creator requests table (for admin approval)
CREATE TABLE creator_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    instagram_handle VARCHAR(100),
    mobile_number VARCHAR(20),
    content_niche VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    status application_status DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create brand requests table (for admin approval)
CREATE TABLE brand_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    brand_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    business_contact VARCHAR(255),
    business_niche VARCHAR(100),
    instagram_handle VARCHAR(100),
    website VARCHAR(255),
    status application_status DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_creators_city ON creators(city);
CREATE INDEX idx_creators_niche ON creators(content_niche);
CREATE INDEX idx_creators_verified ON creators(is_verified);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_city ON campaigns(target_city);
CREATE INDEX idx_applications_status ON campaign_applications(status);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_creators_updated_at BEFORE UPDATE ON creators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON campaign_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_requests ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Creators policies
CREATE POLICY "Anyone can view verified creators" ON creators FOR SELECT USING (is_verified = true);
CREATE POLICY "Creators can view their own profile" ON creators FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Creators can update their own profile" ON creators FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Creators can insert their own profile" ON creators FOR INSERT WITH CHECK (auth.uid() = id);

-- Brands policies
CREATE POLICY "Anyone can view verified brands" ON brands FOR SELECT USING (is_verified = true);
CREATE POLICY "Brands can view their own profile" ON brands FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Brands can update their own profile" ON brands FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Brands can insert their own profile" ON brands FOR INSERT WITH CHECK (auth.uid() = id);

-- Campaigns policies
CREATE POLICY "Anyone can view active campaigns" ON campaigns FOR SELECT USING (status = 'active');
CREATE POLICY "Brands can view their own campaigns" ON campaigns FOR SELECT USING (auth.uid() = brand_id);
CREATE POLICY "Brands can create campaigns" ON campaigns FOR INSERT WITH CHECK (auth.uid() = brand_id);
CREATE POLICY "Brands can update their own campaigns" ON campaigns FOR UPDATE USING (auth.uid() = brand_id);

-- Campaign applications policies
CREATE POLICY "Creators can view their own applications" ON campaign_applications FOR SELECT USING (auth.uid() = creator_id);
CREATE POLICY "Brands can view applications to their campaigns" ON campaign_applications FOR SELECT USING (
    auth.uid() = (SELECT brand_id FROM campaigns WHERE id = campaign_id)
);
CREATE POLICY "Creators can create applications" ON campaign_applications FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Brands can update applications to their campaigns" ON campaign_applications FOR UPDATE USING (
    auth.uid() = (SELECT brand_id FROM campaigns WHERE id = campaign_id)
);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update their own messages" ON messages FOR UPDATE USING (auth.uid() = sender_id);

-- Creator requests policies (admin only)
CREATE POLICY "Admins can manage creator requests" ON creator_requests FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can view their own creator request" ON creator_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own creator request" ON creator_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Brand requests policies (admin only)
CREATE POLICY "Admins can manage brand requests" ON brand_requests FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can view their own brand request" ON brand_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own brand request" ON brand_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
