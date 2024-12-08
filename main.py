import json
import re
import PyPDF2

# Function to extract MCQs from PDF and save to JSON
def extract_mcqs_from_pdf(pdf_path, json_path):
    # Open the PDF file
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""

        # Extract text from each page of the PDF
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

    # Regular expression to match questions
    question_pattern = re.compile(r"(\d+\..+?)(?=\s*[A-E]\.)", re.DOTALL)
    
    # Regular expression to match answer options (A to E)
    answer_pattern = re.compile(r"([A-E]\..+?)(?=\n|$)", re.DOTALL)

    mcqs = []

    # Find all questions
    questions = question_pattern.findall(text)

    # Find all options (answers)
    answers = answer_pattern.findall(text)

    # Ensure there is a one-to-one correspondence between questions and answers
    question_index = 0
    answer_index = 0

    while question_index < len(questions):
        question = questions[question_index].strip()

        # Collect answers (up to 5 options)
        options = []
        while len(options) < 5 and answer_index < len(answers):
            # Strip extra spaces and handle potential newline or line break
            options.append(answers[answer_index].strip().replace("\n", " "))
            answer_index += 1

        mcqs.append({
            "question": question,
            "options": options
        })

        question_index += 1

    # Write the extracted data into a JSON file
    with open(json_path, 'w', encoding='utf-8') as json_file:
        json.dump(mcqs, json_file, ensure_ascii=False, indent=4)

    print(f"MCQs extracted and saved to {json_path}")


# Example usage
pdf_path = 'mcq.pdf'  # Path to your PDF file
json_path = 'mcq.json'  # Desired output JSON file path
extract_mcqs_from_pdf(pdf_path, json_path)
