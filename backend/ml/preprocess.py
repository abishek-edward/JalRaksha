import numpy as np
from .model_loader import model_instance

from typing import Any

def preprocess_input(data: Any) -> np.ndarray:
    """
    Dummy preprocessing that turns input dict into a 41-feature array 
    matching the trained model expected shape.
    """
    features = np.zeros(41)
    val_list = []
    
    if hasattr(data, 'model_dump'):
        dict_data = data.model_dump()
    elif hasattr(data, 'dict'):
        dict_data = data.dict()
    elif isinstance(data, dict):
        dict_data = data
    else:
        dict_data = vars(data)

    for k, v in dict_data.items():
        if isinstance(v, (int, float)):
            val_list.append(v)
            
    # fill features up to 41
    for i in range(min(len(val_list), 41)):
        features[i] = val_list[i]
        
    # Apply scaler
    if model_instance.loaded and model_instance.scaler is not None:
        scaled_features = model_instance.scaler.transform([features])
        return scaled_features
    return np.array([features])
