import cv2
import mediapipe as mp
import time

class HandDetector():

    def __init__(self,
                 static_image_mode=False,
                 max_num_hands=2,
                 min_detection_confidence=0.5,
                 min_tracking_confidence=0.5):

        self.mpHands = mp.solutions.hands
        self.hands = self.mpHands.Hands(static_image_mode,
                                        max_num_hands,
                                        min_detection_confidence,
                                        min_tracking_confidence)
        self.mpDraw = mp.solutions.drawing_utils

    def find_hands(self, img, draw=True):
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = self.hands.process(imgRGB)

        if results.multi_hand_landmarks:
            for handLM in results.multi_hand_landmarks:
                if draw:
                    self.mpDraw.draw_landmarks(img, handLM, self.mpHands.HAND_CONNECTIONS)
                    for id, lm in enumerate(handLM.landmark):
                        h, w, c = img.shape
                        cx, cy = int(lm.x * w), int(lm.y * h)
                        if id in [4, 8, 12, 16, 20]:
                            cv2.circle(img, (cx, cy), 8, (255, 0, 0), cv2.FILLED)
        return img


def main():
    pTime = 0
    cTime = 0
    cap = cv2.VideoCapture(1)

    detector = HandDetector()

    while True:
        success, img = cap.read()

        img = detector.find_hands(img)
        img = cv2.flip(img, 1)

        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime

        cv2.putText(img, str(int(fps)), (10, 70), cv2.FONT_HERSHEY_PLAIN, 3, (255, 0, 255), 2)

        cv2.imshow("Image", img)

        if cv2.waitKey(1) == 27:
            break

if __name__ == "__main__":
    main()
