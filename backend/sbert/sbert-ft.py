import argparse
import torch
import csv
from torch.utils.data import DataLoader
from sentence_transformers import SentenceTransformer, InputExample, losses
from sentence_transformers.evaluation import EmbeddingSimilarityEvaluator

def fine_tune_model(train_data_path, valid_data_path, model_name='all-MiniLM-L6-v2', epochs=1, save_path='fine_tuned_model'):
    model = SentenceTransformer(model_name)

    # Load training dataset
    with open(train_data_path, 'r') as file:
        csv_reader = csv.reader(file)
        train_examples = [InputExample(texts=[row[0], row[1]], label=float(row[2])) for row in csv_reader]

    train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=16)

    # Load validation dataset
    with open(valid_data_path, 'r') as file:
        csv_reader = csv.reader(file)
        valid_examples = [InputExample(texts=[row[0], row[1]], label=float(row[2])) for row in csv_reader]
        
    # Convert validation examples to embeddings and labels
    valid_sentences1 = [example.texts[0] for example in valid_examples]
    valid_sentences2 = [example.texts[1] for example in valid_examples]
    valid_labels = [example.label for example in valid_examples]

    # Convert training examples to embeddings and labels for evaluating training loss
    train_sentences1 = [example.texts[0] for example in train_examples]
    train_sentences2 = [example.texts[1] for example in train_examples]
    train_labels = [example.label for example in train_examples]

    print(valid_sentences1)
    print(valid_sentences2)
    print(valid_labels)

    print(train_sentences1)
    print(train_sentences2)
    print(train_labels)

    # Callback to write information to log file after each epoch
    def callback(score, epoch, steps):
        train_score = train_evaluator(model)
        with open("training-logs.txt", "a") as log_file:
            log_file.write(f"#############################################################\n")
            log_file.write(f"Epoch {epoch + 1}:\n")
            log_file.write(f"\tEstimated Training Loss: {train_score}\n")
            log_file.write(f"\tValidation Accuracy: {score:.4f}\n")
            log_file.write(f"#############################################################")
    
    # Create evaluator
    train_evaluator = EmbeddingSimilarityEvaluator(train_sentences1, train_sentences2, train_labels)
    valid_evaluator = EmbeddingSimilarityEvaluator(valid_sentences1, valid_sentences2, valid_labels)

    train_loss = losses.CosineSimilarityLoss(model=model)

    # Fine-tune the model on your dataset
    model.fit(train_objectives=[(train_dataloader, train_loss)], 
              evaluator=valid_evaluator, 
              epochs=epochs,
              optimizer_params={'lr': 5e-5},  
              callback=callback)

    model.save(save_path)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--train_data", type=str, required=True)
    parser.add_argument("--valid_data", type=str, required=True)
    parser.add_argument("--epochs", type=int, default=1)
    parser.add_argument("--save_path", type=str, default='fine_tuned_model')
    args = parser.parse_args()

    fine_tune_model(args.train_data, args.valid_data, epochs=args.epochs, save_path=args.save_path)
