import argparse
import torch
import csv
from torch.utils.data import DataLoader
from sentence_transformers import SentenceTransformer, InputExample, losses

def fine_tune_model(train_data_path, model_name='all-MiniLM-L6-v2', epochs=1, save_path='fine_tuned_model'):
    # Load pre-trained model
    model = SentenceTransformer(model_name)

    # Prepare custom dataset
    with open(train_data_path, 'r') as file:
        csv_reader = csv.reader(file)
        examples = [InputExample(texts=[row[0], row[1]], label=0.9) for row in csv_reader] 

    # Convert the examples into a DataLoader
    train_dataloader = DataLoader(examples, shuffle=True, batch_size=16)
    
    # Define a training loss
    train_loss = losses.CosineSimilarityLoss(model=model)

    # Fine-tune the model on your dataset
    model.fit(train_objectives=[(train_dataloader, train_loss)], epochs=epochs)

    # Save the fine-tuned model
    model.save(save_path)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--train_data", type=str, required=True, help="Path to training data in the form of: first string,second string")
    parser.add_argument("--epochs", type=int, default=1, help="Number of epochs for training")
    parser.add_argument("--save_path", type=str, default='fine_tuned_model', help="Path to save the fine-tuned model")
    args = parser.parse_args()

    fine_tune_model(args.train_data, epochs=args.epochs, save_path=args.save_path)
