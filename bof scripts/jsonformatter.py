import json

# Load data from a JSON file
def load_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

# Function to extract options as a dictionary
def extract_options(question_data):
    processed_questions = []
    for item in question_data:
        options_dict = {}
        for option in item['options']:
            key, value = option.split(". ", 1)
            options_dict[key] = value
        processed_questions.append({
            "question": item['question'],
            "options": options_dict,
            "correct_answer": item['correct_answer'],
            "explanation": item['explanation']
        })
    return processed_questions

# Save processed data to a JSON file
def save_data(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

# Main function to process the JSON file
def main(input_file, output_file):
    data = load_data(input_file)
    processed_data = extract_options(data)
    save_data(output_file, processed_data)

# Specify input and output file paths
input_file = 'mcq7.json'
output_file = 'output.json'

# Run the main function
if __name__ == "__main__":
    main(input_file, output_file)
