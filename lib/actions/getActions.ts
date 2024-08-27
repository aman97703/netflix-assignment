"use server";
import { db } from "@/lib/db";
import { checkDatabaseConnection } from "../checkMongoConnection";
import { getUser } from "../getUser";

export async function getRandomMovie() {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Database connection failed",
      };
    }
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    const videosCount = await db.video.count();
    const randomIndex = Math.floor(Math.random() * videosCount);
    const randomVideo = await db.video.findMany({
      take: 1,
      skip: randomIndex,
    });

    return {
      success: true,
      data: randomVideo[0],
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
    };
  }
}

export async function getTopTenMovies() {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Database connection failed",
      };
    }
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    const videosCount = await db.video.count();
    const randomIndex = Math.floor(Math.random() * videosCount);
    const randomVideo = await db.video.findMany({
      take: 10,
      skip: randomIndex,
    });

    return {
      success: true,
      data: randomVideo,
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
    };
  }
}
export async function getNextWatch() {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Database connection failed",
      };
    }
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    const randomVideo = await db.video.findMany({
      take: 7,
    });

    return {
      success: true,
      data: randomVideo,
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
    };
  }
}
export async function getAllVideos() {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Database connection failed",
      };
    }
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    const videos = await db.video.findMany();

    return {
      success: true,
      data: videos,
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
    };
  }
}
export async function getActionAllByGenre() {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Database connection failed",
      };
    }
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    const [action, comedy, crime, horror, romance, scifi, thriller] =
      await Promise.all([
        db.video.findMany({
          where: {
            genres: "ACTION",
          },
        }),
        db.video.findMany({
          where: {
            genres: "COMEDY",
          },
        }),
        db.video.findMany({
          where: {
            genres: "CRIME",
          },
        }),
        db.video.findMany({
          where: {
            genres: "HORROR",
          },
        }),
        db.video.findMany({
          where: {
            genres: "ROMANCE",
          },
        }),
        db.video.findMany({
          where: {
            genres: "SCIFI",
          },
        }),
        db.video.findMany({
          where: {
            genres: "THRILLER",
          },
        }),
      ]);

    return {
      success: true,
      action,
      comedy,
      crime,
      horror,
      romance,
      scifi,
      thriller,
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
    };
  }
}

export async function getVideo(videoId: string) {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Database connection failed",
      };
    }
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
    const video = await db.video.findUnique({
      where: {
        id: videoId,
      },
    });

    return {
      success: true,
      data: video,
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
    };
  }
}
