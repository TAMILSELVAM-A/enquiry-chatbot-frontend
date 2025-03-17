import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Button, Card, CardContent, CardMedia, AppBar, Toolbar, IconButton, InputBase, Badge, TextField, Paper, Chip, Stack, Drawer, Grid, Tooltip, Zoom } from "@mui/material";
import { styled } from "@mui/system";
import { FaBars, FaSearch, FaTimes, FaShoppingCart } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import AddIcon from '@mui/icons-material/Add';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    "&:hover": {
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)"
    }
}));

const SearchBox = styled(Paper)({
    display: "flex",
    alignItems: "center",
    padding: "4px 12px",
    margin: "0 12px",
    flex: 0.5,
    borderRadius: "8px",
    background: "linear-gradient(white, white) padding-box, linear-gradient(45deg, #4CAF50, #81C784) border-box",
    border: "1px solid transparent",
    transition: "all 0.3s ease",
    "&:hover": {
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
    }
});

const ChatButton = styled(IconButton)({
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "linear-gradient(45deg, #4CAF50, #81C784)",
    color: "#fff",
    padding: 16,
    boxShadow: "0 4px 12px rgba(76,175,80,0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
        transform: "scale(1.1)",
        boxShadow: "0 6px 16px rgba(76,175,80,0.4)"
    }
});

const ChatContainer = styled(Box)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(to bottom, #f8f9fa, #ffffff)",
    position: "relative"
});

const ChatHeader = styled(Box)({
    background: "linear-gradient(45deg, #4CAF50, #81C784)",
    color: "#fff",
    padding: "16px"
});

const MessageBubble = styled(Box)(({ isUser }) => ({
    maxWidth: "70%",
    padding: "10px 16px",
    borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
    background: isUser ? "linear-gradient(45deg, #4CAF50, #81C784)" : "#fff",
    color: isUser ? "#fff" : "#333",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    margin: "4px 0",
    wordWrap: "break-word"
}));

const ChatInput = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        borderRadius: "0px",
        "&.Mui-focused fieldset": {
            borderColor: "#4CAF50"
        }
    }
});

const phones = [
    {
        id: 1,
        name: "Galaxy S25 Ultra",
        price: "₹ 1,29,999",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
        specs: "12GB RAM | 512GB Storage"
    },
    {
        id: 2,
        name: "iPhone 15",
        price: "₹ 99,999",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
        specs: "6GB RAM | 128GB Storage"
    },
    {
        id: 3,
        name: "Oneplus Nord 4 ",
        price: "₹ 29,999",
        image: "https://images.unsplash.com/photo-1673718423569-27ce5b3857c2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        specs: "8GB RAM | 128GB Storage"
    }
];

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const FAQ_QUESTIONS = [
        "Mobiles under ₹30,000",
        "Highest battery capacity",
        "iPhones currently in stock",
        "Best discounts"
    ];

    const sendMessage = async (query) => {
        if (!query.trim()) return;

        const userMessage = { text: query, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setUserInput("");

        try {
            const response = await fetch("https://enquiry-chatbot-backend.onrender.com/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });

            const data = await response.json();
            const botMessage = { text: data.response || "Sorry, I didn't understand that.", sender: "bot" };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages((prev) => [...prev, { text: "Something went wrong. Please try again later.", sender: "bot" }]);
        }
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        sendMessage(userInput);
    };

    const handleCloseDrawer = () => {
        setChatOpen(false);
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa" }}>
            <StyledAppBar position="sticky">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton edge="start" onClick={() => setMenuOpen(true)}>
                            <FaBars />
                        </IconButton>
                        <img
                            src="https://img.freepik.com/premium-vector/phone-shop-outline-commerce-logo-vector-icon-illustration_125355-405.jpg?w=900"
                            alt="Logo"
                            style={{ height: 70, marginRight: 16, borderRadius: "8px" }}
                        />
                    </Box>
                    <SearchBox>
                        <InputBase
                            placeholder="Search phones..."
                            sx={{ ml: 1, flex: 1 }}
                        />
                        <IconButton><FaSearch /></IconButton>
                    </SearchBox>
                    <IconButton>
                        <Badge badgeContent={4} color="primary">
                            <FaShoppingCart />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </StyledAppBar>

            <Box
                sx={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1616348436168-de43ad0db179)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    height: "80vh",
                    display: "flex",
                    alignItems: "center",
                    position: "relative"
                }}
            >
                <Container maxWidth="lg">
                    <Zoom in={true} timeout={1000}>
                        <Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    color: "#fff",
                                    mb: 2,
                                    fontWeight: "bold",
                                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                                }}
                            >
                                Discover Latest Phones
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: "#fff",
                                    mb: 3,
                                    opacity: 0.9,
                                    textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
                                }}
                            >
                                Find your perfect match with our extensive collection
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    borderRadius: "20px",
                                    padding: "12px 32px",
                                    fontSize: "1.1rem",
                                    textTransform: "none",
                                    background: "linear-gradient(45deg, #4CAF50, #81C784)",
                                    boxShadow: "0 4px 12px rgba(76,175,80,0.3)",
                                    "&:hover": {
                                        background: "linear-gradient(45deg, #388E3C, #4CAF50)",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 6px 16px rgba(76,175,80,0.4)"
                                    }
                                }}
                            >
                                Shop Now
                            </Button>
                        </Box>
                    </Zoom>
                </Container>
            </Box>

            <Container sx={{ my: 8 }} maxWidth="lg">
                <Typography
                    variant="h4"
                    sx={{
                        mb: 4,
                        fontWeight: "bold",
                        background: "linear-gradient(45deg, #4CAF50, #81C784)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    Featured Phones
                </Typography>
                <Grid container spacing={4}>
                    {phones.map((phone) => (
                        <Grid item xs={12} sm={6} md={4} key={phone.id}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: "0 12px 24px rgba(0,0,0,0.1)"
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={phone.image}
                                    alt={phone.name}
                                    sx={{
                                        objectFit: "cover",
                                        transition: "transform 0.3s ease",
                                        "&:hover": {
                                            transform: "scale(1.05)"
                                        }
                                    }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">{phone.name}</Typography>
                                    <Typography color="text.secondary" sx={{ my: 1 }}>{phone.specs}</Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 2,
                                            background: "linear-gradient(45deg, #4CAF50, #81C784)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {phone.price}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            borderRadius: "20px",
                                            textTransform: "none",
                                            background: "linear-gradient(45deg, #4CAF50, #81C784)",
                                            "&:hover": {
                                                background: "linear-gradient(45deg, #388E3C, #4CAF50)"
                                            }
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <ChatButton onClick={() => setChatOpen(true)}>
                <BsChatDotsFill size={24} />
            </ChatButton>

            {/* Chat Drawer replacing Dialog */}
            <Drawer
                anchor="right"
                open={chatOpen}
                onClose={handleCloseDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: '100%', sm: '400px' },
                        borderRadius: { xs: 0, sm: '20px 0 0 20px' },
                        overflow: 'hidden'
                    }
                }}
            >
                <ChatContainer>
                    <ChatHeader>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <BsChatDotsFill size={24} style={{ marginRight: "10px" }} />
                            <Typography variant="h6">Chat Support</Typography>
                            <IconButton
                                onClick={handleCloseDrawer}
                                sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
                            >
                                <FaTimes />
                            </IconButton>
                        </Box>
                    </ChatHeader>

                    <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2, height: "calc(100vh - 180px)" }}>
                        {messages.length === 0 && (
                            <>
                                <Typography variant='subtitle2' sx={{ mb: 1 }}>FAQ's</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {FAQ_QUESTIONS.map((faq, index) => (
                                        <Chip key={index} label={faq} color="success" variant="outlined" sx={{ borderRadius: 0 }} onClick={() => sendMessage(faq)} />
                                    ))}
                                </Box>
                            </>
                        )}
                        {messages.map((msg, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                    mb: 2
                                }}
                            >
                                <MessageBubble isUser={msg.sender === "user"}>
                                    {msg.sender === "bot" ?
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.text}
                                        </ReactMarkdown>
                                        :
                                        <Typography>{msg.text}</Typography>
                                    }
                                </MessageBubble>
                            </Box>
                        ))}
                    </Box>

                    {/* FAQ Buttons */}
                    {/* <Box sx={{ p: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {FAQ_QUESTIONS.map((faq, index) => (
                            <Button key={index} variant="outlined" size="small"
                                sx={{
                                    border: "linear-gradient(45deg, #388E3C, #4CAF50)",
                                }} onClick={() => sendMessage(faq)}>
                                {faq}
                            </Button>
                        ))}
                    </Box> */}
                    <Box sx={{ p: 2, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                        <form onSubmit={handleChatSubmit}>
                            <Stack direction="row" spacing={1}>
                                <ChatInput
                                    fullWidth
                                    placeholder="Type your message..."
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        borderRadius: "10px",
                                        minWidth: "100px",
                                        background: "linear-gradient(45deg, #4CAF50, #81C784)",
                                        "&:hover": {
                                            background: "linear-gradient(45deg, #388E3C, #4CAF50)"
                                        }
                                    }}
                                >
                                    Send
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </ChatContainer>
            </Drawer>
            <Drawer
                anchor="left"
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            >
                <Box sx={{ width: 250, p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Menu</Typography>
                    <Stack spacing={1}>
                        {["Home", "Phones", "Accessories", "Support", "Contact"].map((text) => (
                            <Button key={text} fullWidth variant="text">
                                {text}
                            </Button>
                        ))}
                    </Stack>
                </Box>
            </Drawer>
        </Box >
    );
};

export default App;
