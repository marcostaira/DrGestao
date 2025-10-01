import app from "./app";
import DatabaseService from "./config/database";

// ============================================================================
// SERVER SETUP
// ============================================================================

const PORT = process.env.PORT || 3001;

// ============================================================================
// START SERVER
// ============================================================================

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    console.log("🔌 Connecting to database...");
    await DatabaseService.connect();

    // Check database connection
    const isConnected = await DatabaseService.checkConnection();
    if (!isConnected) {
      throw new Error("Failed to establish database connection");
    }

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(
        `📖 API Documentation available at http://localhost:${PORT}/health`
      );
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });

    // Handle server errors
    server.on("error", (error: any) => {
      if (error.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use`);
        process.exit(1);
      } else {
        console.error("❌ Server error:", error);
        process.exit(1);
      }
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);

      server.close(async () => {
        console.log("🔌 Server closed");

        try {
          await DatabaseService.disconnect();
          console.log("📦 Database disconnected");
          process.exit(0);
        } catch (error) {
          console.error("❌ Error disconnecting from database:", error);
          process.exit(1);
        }
      });

      // Force close server after 30 seconds
      setTimeout(() => {
        console.error(
          "⏰ Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
      }, 30000);
    };

    // Register shutdown handlers
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// ============================================================================
// ERROR HANDLERS
// ============================================================================

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  console.error("💥 Uncaught Exception:", error);
  console.error("Stack:", error.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  console.error("💥 Unhandled Rejection at:", promise);
  console.error("Reason:", reason);
  process.exit(1);
});

// ============================================================================
// START APPLICATION
// ============================================================================

startServer();

// Export for testing
export default app;
