import json
import re
import pdfplumber

# Function to extract MCQs from PDF and save to JSON
def extract_mcqs_from_pdf(pdf_path, json_path):
    # Open the PDF file
    with pdfplumber.open(pdf_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()

    # Regular expressions for questions and options
    question_pattern = re.compile(r"(\d+\..+?)(?=\s[A-E]\.)", re.DOTALL)
    option_pattern = re.compile(r"([A-E]\..+?)(?=\s[A-E]\.|(?=\n\d+\.)|$)", re.DOTALL)

    mcqs = []

    # Find all questions
    questions = question_pattern.findall(text)

    # Find all options (answers)
    options = option_pattern.findall(text)

    # Group options with corresponding questions
    question_index = 0
    option_index = 0

    while question_index < len(questions):
        # Remove the question number and newline characters
        question = re.sub(r"^\d+\.\s*", "", questions[question_index].strip()).replace("\n", " ")

        # Collect up to 5 options for the current question
        current_options = []
        while len(current_options) < 5 and option_index < len(options):
            option = options[option_index].strip().replace("\n", " ")

            # Stop if the option contains the start of the next question
            if re.match(r"^\d+\.", option):
                break

            current_options.append(option)
            option_index += 1

        mcqs.append({
            "question": question,
            "options": current_options
        })

        question_index += 1

    # Write the extracted data into a JSON file
    with open(json_path, 'w', encoding='utf-8') as json_file:
        json.dump(mcqs, json_file, ensure_ascii=False, indent=4)

    print(f"MCQs extracted and saved to {json_path}")


# Example usage
pdf_path = 'mcq.pdf'  # Path to your PDF file
json_path = 'mcq2.json'  # Desired output JSON file path
extract_mcqs_from_pdf(pdf_path, json_path)
