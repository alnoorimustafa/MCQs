import json
import re
import pdfplumber

# Function to extract MCQs from PDF and save to JSON with correct answer and explanation
def extract_mcqs_from_pdf(pdf_path, json_path, pages=None):
    # Open the PDF file
    with pdfplumber.open(pdf_path) as pdf:
        text = ""
        # If pages are provided, process only those pages
        if pages:
            # Convert the range or list to a list of page numbers
            if isinstance(pages, range):
                pages = list(pages)
            for page_num in pages:
                # Ensure the page number is within range
                if 0 <= page_num < len(pdf.pages):
                    text += pdf.pages[page_num].extract_text()
                else:
                    print(f"Page {page_num} is out of range, skipping.")
        else:
            # If no specific pages are provided, process all pages
            for page in pdf.pages:
                text += page.extract_text()

    # Regular expressions for questions, options, correct answer, and explanation
    question_pattern = re.compile(r"(\d+\..+?)(?=\s[A-E]\.)", re.DOTALL)  # Capture questions
    option_pattern = re.compile(r"([A-E]\..+?)(?=\s[A-E]\.|(?=\n\d+\.)|$)", re.DOTALL)  # Capture options
    answer_explanation_pattern = re.compile(r"(\d+\.)\s([A-E])\.\s(.*?)(?=\n\d+\.|$)", re.DOTALL)  # Capture correct answer and explanation

    mcqs = []

    # Find all questions
    questions = question_pattern.findall(text)

    # Find all options (answers)
    options = option_pattern.findall(text)

    # Find correct answers and explanations
    answer_explanation = answer_explanation_pattern.findall(text)

    # Group options with corresponding questions
    question_index = 0
    option_index = 0
    answer_index = 0

    while question_index < len(questions):
        # Remove the question number and newline characters
        question = re.sub(r"^\d+\.\s*", "", questions[question_index].strip()).replace("\n", " ")

        # Collect options for the current question
        current_options = []
        while len(current_options) < 5 and option_index < len(options):
            option = options[option_index].strip().replace("\n", " ")

            # Stop if the option contains the start of the next question
            if re.match(r"^\d+\.", option):
                break

            current_options.append(option)
            option_index += 1

        # Now extract the correct answer and explanation
        if answer_index < len(answer_explanation):
            answer_number, correct_answer, explanation = answer_explanation[answer_index]
            explanation = explanation.strip().replace("\n", " ")

            mcqs.append({
                "question": question,
                "options": current_options,
                "correct_answer": correct_answer,
                "explanation": explanation
            })

            answer_index += 1

        question_index += 1

    # Write the extracted data into a JSON file
    with open(json_path, 'w', encoding='utf-8') as json_file:
        json.dump(mcqs, json_file, ensure_ascii=False, indent=4)

    print(f"MCQs extracted and saved to {json_path}")

# Example usage
pdf_path = 'complete.pdf'  # Path to your PDF file
json_path = 'mcq_with_correct_answer_and_explanation.json'  # Desired output JSON file path
pages_to_process = range(17, 49)  # Specify a range of pages (0-based index)
extract_mcqs_from_pdf(pdf_path, json_path, pages_to_process)
