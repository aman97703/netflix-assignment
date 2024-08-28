"use server";
import { db } from "@/lib/db";
import { checkDatabaseConnection } from "../checkMongoConnection";
import { getUser } from "../getUser";
import { VideoType } from "@prisma/client";

export async function getRandomMovie(type: VideoType) {
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
    const videosCount = await db.video.count({
      where: {
        type,
      },
    });
    const randomIndex = Math.floor(Math.random() * videosCount);
    const randomVideo = await db.video.findMany({
      where: {
        type: type,
      },
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
export async function getRandomVideo() {
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

export async function getTopTenMovies(type: VideoType) {
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
      where: {
        type: type,
      },
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
export async function getTopTenMoviesWithoutUser(type: VideoType) {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Database connection failed",
      };
    }
    const randomVideo = await db.video.findMany({
      where: {
        type: type,
      },
      take: 10,
    });

    const randomVideoWithOutVideo = randomVideo.map((video) => ({
      id: video.id,
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      genres: video.genres,
      duration: video.duration,
      type: video.type,
    }));

    return {
      success: true,
      data: randomVideoWithOutVideo,
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
    };
  }
}
export async function getTopTenVideos() {
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
      include: {
        FavoriteVideo: true,
      },
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
export async function getNextWatchMovies(type: VideoType) {
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
      where: {
        type: type,
      },
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
export async function getActionAllMoviesByGenre(type: VideoType) {
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
            type: type,
          },
        }),
        db.video.findMany({
          where: {
            genres: "COMEDY",
            type: type,
          },
        }),
        db.video.findMany({
          where: {
            genres: "CRIME",
            type: type,
          },
        }),
        db.video.findMany({
          where: {
            genres: "HORROR",
            type: type,
          },
        }),
        db.video.findMany({
          where: {
            genres: "ROMANCE",
            type: type,
          },
        }),
        db.video.findMany({
          where: {
            genres: "SCIFI",
            type: type,
          },
        }),
        db.video.findMany({
          where: {
            genres: "THRILLER",
            type: type,
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
export async function getMyList() {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      return {
        success: false,
        message: "Database connection failed",
        data:[],
      };
    }
    const user = await getUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
        data:[],
      };
    }
    // Fetch user's favorite videos
    const userFavorites = await db.favoriteVideo.findMany({
      where: {
        userId: user.id,
      },
      include: {
        video: true, // Join the `Video` model to get video details
      },
    });

    // Map to extract video details
    const favoriteVideos = userFavorites.map((favorite) => favorite.video);

    return {
      success: true,
      data: favoriteVideos,
    };
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return {
      success: false,
      message: "Server error",
      data:[]
    };
  }
}
export async function getMyFavIds() {
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
    // Fetch user's favorite videos
    const favorites = await db.favoriteVideo.findMany({
      where: { userId: user.id },
    });

    // Map to extract video details
    const favoriteIds = new Set(favorites.map((favorite) => favorite.videoId));

    return {
      success: true,
      favoriteIds,
    };
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return {
      success: false,
      message: "Server error",
    };
  }
}
