import cv2
import numpy as np
from ultralytics import YOLO

model = YOLO("yolov8n.pt")

def analyze_image(image_path):
    img = cv2.imread(image_path)
    h, w, _ = img.shape

    results = model(img)[0]

    best = None
    max_area = 0

    for box in results.boxes:
        cls = int(box.cls[0])
        name = model.names[cls]
        x1,y1,x2,y2 = map(int, box.xyxy[0])
        area = (x2-x1)*(y2-y1)

        if name in ["dog","cat","cow","horse"] and area > max_area:
            best = (name, x1,y1,x2,y2, float(box.conf[0]))
            max_area = area

    if best:
        animal = best[0].capitalize()
    else:
        animal = "Unknown"

    # -------- Injury Analysis --------
    blood_ratio = 0
    face_damage = 0
    closeness = 0
    confidence_penalty = 1

    if best:
        name, x1,y1,x2,y2,conf = best

        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        red_mask = cv2.inRange(hsv, (0,40,40), (15,255,255))
        blood_ratio = np.sum(red_mask>0)/red_mask.size

        face_crop = img[y1:y2, x1:x2]
        if face_crop.size > 0:
            hsv_face = cv2.cvtColor(face_crop, cv2.COLOR_BGR2HSV)
            face_red = cv2.inRange(hsv_face, (0,40,40), (15,255,255))
            face_damage = np.sum(face_red>0)/face_red.size

        closeness = (x2-x1)*(y2-y1)/(h*w)
        confidence_penalty = (1-conf)

    else:
        # If AI can't detect animal but image is provided, treat as suspicious
        blood_ratio = 0.03
        face_damage = 0.02
        closeness = 0.5
        confidence_penalty = 0.8

    # -------- Severity Score --------
    severity = (
        blood_ratio * 50 +
        face_damage * 80 +
        closeness * 40 +
        confidence_penalty * 30
    )

    severity = min(100, int(severity))

    if severity < 30:
        label = "Low"
    elif severity < 70:
        label = "Moderate"
    else:
        label = "Critical"

    return {
        "animal": animal,
        "severity": label,
        "score": severity
    }
