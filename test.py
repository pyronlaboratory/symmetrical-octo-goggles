import math

# using opencv3
import cv2
import numpy as np


def Representational(r, g, b):
    return 0.299 * r + 0.287 * g + 0.114 * b


def calculate(img):
    """
    Takes an image as input and splits its RGB channels into separate components
    (red, green, blue). It then returns a representation of the image's pixel
    values as a Representational object.

    Args:
        img (cv2Image): Passed to the split() method to separate its RGB channels
            into individual integers, which are then used to create a Representational
            object.

    Returns:
        Representational: A combination of red, green and blue pixel values from
        an input image.

    """
    b, g, r = cv2.split(img)
    pixelAt = Representational(r, g, b)
    return pixelAt


def main():
    # Loading images (orignal image and compressed image)
    """
    Performs image comparison by calculating the difference between two images,
    computing the PSNR (Peak Signal-to-Noise Ratio) and printing the result.

    """
    orignal_image = cv2.imread("orignal_image.png", 1)
    compressed_image = cv2.imread("compressed_image.png", 1)

    # Getting image height and width
    height, width = orignal_image.shape[:2]

    orignalPixelAt = calculate(orignal_image)
    compressedPixelAt = calculate(compressed_image)

    diff = orignalPixelAt - compressedPixelAt
    error = np.sum(np.abs(diff) ** 2)

    error = error / (height * width)

    # MSR = error_sum/(height*width)
    PSNR = -(10 * math.log10(error / (255 * 255)))

    print("PSNR value is {}".format(PSNR))


if __name__ == "__main__":
    main()
