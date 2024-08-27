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
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        favoriteVideoIds: {
          push: videoId,
        },
      },
    });

    return {
      success: true,
      message: "Added to list",
    };
  } catch (error) {
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
    const currentUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!currentUser) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    const currentFavIds = currentUser.favoriteVideoIds.filter(
      (f) => f !== videoId
    );
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        favoriteVideoIds: currentFavIds,
      },
    });

    return {
      success: true,
      message: "Removed From List",
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
    };
  }
}
