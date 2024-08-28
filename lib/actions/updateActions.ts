"use server";
import { checkDatabaseConnection } from "../checkMongoConnection";
import { db } from "../db";
import { getUser } from "../getUser";

export async function addToMyList(videoId: string) {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Database connection failed",
      };
    }

    const user = await getUser();
    if (!user || !user.id) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    // Ensure video exists
    const video = await db.video.findUnique({
      where: { id: videoId },
    });
    if (!video) {
      return {
        success: false,
        message: "Video not found",
      };
    }

    // Add video to user's favorites
    await db.favoriteVideo.create({
      data: {
        userId: user.id,
        videoId: videoId,
      },
    });

    return {
      success: true,
      message: "Added to list",
    };
  } catch (error) {
    console.error('Error adding to list:', error);
    return {
      success: false,
      message: "Server error",
    };
  }
}
export async function removeFromMyList(videoId: string) {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Database connection failed",
      };
    }

    const user = await getUser();
    if (!user || !user.id) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    // Remove video from user's favorites
    await db.favoriteVideo.deleteMany({
      where: {
        userId: user.id,
        videoId: videoId,
      },
    });

    return {
      success: true,
      message: "Removed from list",
    };
  } catch (error) {
    console.error('Error removing from list:', error);
    return {
      success: false,
      message: "Server error",
    };
  }
}