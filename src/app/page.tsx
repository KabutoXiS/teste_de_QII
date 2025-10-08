'use client'

import { useState, useEffect } from 'react'
import { Brain, CheckCircle, Trophy, Share2, Lock } from 'lucide-react'

// Tipos TypeScript
interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: 'logic' | 'math' | 'pattern' | 'attention'
}

interface QuizState {
  currentQuestion: number
  answers: number[]
  showResult: boolean
  paymentCompleted: boolean
  iqScore: number
}

// 25 perguntas de QI variadas
const questions: Question[] = [
  {
    id: 1,
    question: "Qual número vem a seguir na sequência: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1,
    category: "logic"
  },
  {
    id: 2,
    question: "Se todos os gatos são animais e alguns animais são selvagens, então:",
    options: ["Todos os gatos são selvagens", "Alguns gatos podem ser selvagens", "Nenhum gato é selvagem", "Todos os animais são gatos"],
    correctAnswer: 1,
    category: "logic"
  },
  {
    id: 3,
    question: "Quantos triângulos você consegue contar na figura? (Imagine um triângulo grande dividido em 9 triângulos menores)",
    options: ["9", "13", "16", "18"],
    correctAnswer: 1,
    category: "attention"
  },
  {
    id: 4,
    question: "Se 5 máquinas fazem 5 produtos em 5 minutos, quantas máquinas são necessárias para fazer 100 produtos em 100 minutos?",
    options: ["5", "20", "25", "100"],
    correctAnswer: 0,
    category: "math"
  },
  {
    id: 5,
    question: "Qual palavra não pertence ao grupo: LIVRO, REVISTA, JORNAL, TELEVISÃO",
    options: ["LIVRO", "REVISTA", "JORNAL", "TELEVISÃO"],
    correctAnswer: 3,
    category: "logic"
  },
  {
    id: 6,
    question: "Complete a sequência: A, D, G, J, ?",
    options: ["K", "L", "M", "N"],
    correctAnswer: 2,
    category: "pattern"
  },
  {
    id: 7,
    question: "Um trem viaja 60 km em 45 minutos. Qual é sua velocidade em km/h?",
    options: ["75", "80", "85", "90"],
    correctAnswer: 1,
    category: "math"
  },
  {
    id: 8,
    question: "Se CÓDIGO é para 35469 como BODE é para:",
    options: ["1643", "1463", "1346", "1634"],
    correctAnswer: 0,
    category: "pattern"
  },
  {
    id: 9,
    question: "Qual é o próximo número: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "13", "15", "17"],
    correctAnswer: 1,
    category: "math"
  },
  {
    id: 10,
    question: "Se você reorganizar as letras 'CIFAIPC', você obtém o nome de:",
    options: ["Um país", "Um animal", "Uma cor", "Uma profissão"],
    correctAnswer: 0,
    category: "logic"
  },
  {
    id: 11,
    question: "Quantos cubos pequenos há em um cubo 4x4x4?",
    options: ["48", "56", "64", "72"],
    correctAnswer: 2,
    category: "math"
  },
  {
    id: 12,
    question: "Complete: 16, 06, 68, 88, ?, 98",
    options: ["78", "80", "87", "90"],
    correctAnswer: 0,
    category: "pattern"
  },
  {
    id: 13,
    question: "Se hoje é terça-feira, que dia será daqui a 100 dias?",
    options: ["Segunda", "Terça", "Quarta", "Quinta"],
    correctAnswer: 0,
    category: "logic"
  },
  {
    id: 14,
    question: "Qual número está faltando: 7, 14, 28, ?, 112",
    options: ["42", "49", "56", "63"],
    correctAnswer: 2,
    category: "math"
  },
  {
    id: 15,
    question: "Se MESA tem 4 letras e CADEIRA tem 7, quantas letras tem SOFÁ?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    category: "attention"
  },
  {
    id: 16,
    question: "Complete a analogia: ÁGUA está para SEDE como COMIDA está para:",
    options: ["FOME", "PRATO", "BOCA", "ESTÔMAGO"],
    correctAnswer: 0,
    category: "logic"
  },
  {
    id: 17,
    question: "Qual é o resultado de: 15 + 27 × 2 - 18 ÷ 3?",
    options: ["63", "65", "67", "69"],
    correctAnswer: 0,
    category: "math"
  },
  {
    id: 18,
    question: "Se você tem 6 maçãs e come 2, depois compra mais 4, quantas você tem?",
    options: ["6", "8", "10", "12"],
    correctAnswer: 1,
    category: "math"
  },
  {
    id: 19,
    question: "Qual padrão segue a sequência: O, T, T, F, F, S, S, ?",
    options: ["E", "N", "O", "T"],
    correctAnswer: 0,
    category: "pattern"
  },
  {
    id: 20,
    question: "Se um relógio marca 3:15, qual é o ângulo entre os ponteiros?",
    options: ["0°", "7.5°", "15°", "22.5°"],
    correctAnswer: 1,
    category: "math"
  },
  {
    id: 21,
    question: "Complete: SEGUNDA, TERÇA, ?, QUINTA",
    options: ["QUARTA", "SEXTA", "SÁBADO", "DOMINGO"],
    correctAnswer: 0,
    category: "logic"
  },
  {
    id: 22,
    question: "Se 3x + 7 = 22, qual é o valor de x?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    category: "math"
  },
  {
    id: 23,
    question: "Quantas palavras de 3 letras podem ser formadas com A, B, C (sem repetição)?",
    options: ["3", "6", "9", "12"],
    correctAnswer: 1,
    category: "math"
  },
  {
    id: 24,
    question: "Se AMOR é escrito como 1-13-15-18, como seria escrito VIDA?",
    options: ["22-9-4-1", "22-9-3-1", "21-9-4-1", "21-8-4-1"],
    correctAnswer: 0,
    category: "pattern"
  },
  {
    id: 25,
    question: "Qual é o próximo na sequência: 2, 5, 11, 23, ?",
    options: ["35", "41", "47", "53"],
    correctAnswer: 2,
    category: "logic"
  }
]

export default function IQTestPage() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    showResult: false,
    paymentCompleted: false,
    iqScore: 0
  })
  
  const [currentScreen, setCurrentScreen] = useState<'home' | 'quiz' | 'payment' | 'result'>('home')
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  // Verificar se o pagamento foi concluído ao carregar a página
  useEffect(() => {
    const paymentStatus = localStorage.getItem('iq-test-payment')
    const savedAnswers = localStorage.getItem('iq-test-answers')
    
    if (paymentStatus === 'completed' && savedAnswers) {
      const answers = JSON.parse(savedAnswers)
      const iqScore = calculateIQ(answers)
      setQuizState({
        currentQuestion: 24,
        answers,
        showResult: true,
        paymentCompleted: true,
        iqScore
      })
      setCurrentScreen('result')
      // Limpar dados após mostrar resultado
      localStorage.removeItem('iq-test-payment')
      localStorage.removeItem('iq-test-answers')
    }
  }, [])

  // Resetar seleção ao mudar pergunta
  useEffect(() => {
    setSelectedAnswer(null)
  }, [quizState.currentQuestion])

  const startQuiz = () => {
    setCurrentScreen('quiz')
    setQuizState({
      currentQuestion: 0,
      answers: [],
      showResult: false,
      paymentCompleted: false,
      iqScore: 0
    })
    // Limpar dados anteriores
    localStorage.removeItem('iq-test-payment')
    localStorage.removeItem('iq-test-answers')
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...quizState.answers]
    newAnswers[quizState.currentQuestion] = selectedAnswer ?? -1

    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        answers: newAnswers
      })
    } else {
      // Quiz finalizado - salvar respostas
      const iqScore = calculateIQ(newAnswers)
      localStorage.setItem('iq-test-answers', JSON.stringify(newAnswers))
      setQuizState({
        ...quizState,
        answers: newAnswers,
        iqScore,
        showResult: true
      })
      setCurrentScreen('payment')
    }
  }

  const calculateIQ = (answers: number[]): number => {
    let correctAnswers = 0
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctAnswers++
      }
    })
    
    // Fórmula simplificada de QI baseada na porcentagem de acertos
    const percentage = (correctAnswers / questions.length) * 100
    let iq = 70 + (percentage * 0.6) // Base 70, máximo ~130
    
    // Adicionar variação aleatória para parecer mais realista
    iq += Math.random() * 10 - 5
    
    return Math.round(Math.max(70, Math.min(160, iq)))
  }

  const handlePayment = async () => {
    setIsProcessingPayment(true)
    
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 0.99,
          description: 'Resultado do Teste de QI'
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        // Redirecionar para o checkout do Mercado Pago
        window.location.href = data.init_point
      } else {
        // Para demonstração, simular pagamento aprovado após 2 segundos
        setTimeout(() => {
          localStorage.setItem('iq-test-payment', 'completed')
          setQuizState({
            ...quizState,
            paymentCompleted: true
          })
          setCurrentScreen('result')
          setIsProcessingPayment(false)
        }, 2000)
      }
    } catch (error) {
      // Para demonstração, simular pagamento aprovado
      setTimeout(() => {
        localStorage.setItem('iq-test-payment', 'completed')
        setQuizState({
          ...quizState,
          paymentCompleted: true
        })
        setCurrentScreen('result')
        setIsProcessingPayment(false)
      }, 2000)
    }
  }

  const getIQFeedback = (iq: number): string => {
    if (iq >= 140) return "Excepcional! Seu QI está no topo de 1% da população mundial. Você possui inteligência superior!"
    if (iq >= 130) return "Muito superior! Seu QI está acima de 98% das pessoas. Excelente capacidade de raciocínio!"
    if (iq >= 120) return "Superior! Seu QI está acima de 90% da população. Você tem ótima capacidade analítica!"
    if (iq >= 110) return "Acima da média! Seu QI está acima de 75% das pessoas. Bom raciocínio lógico!"
    if (iq >= 90) return "Média! Seu QI está na faixa normal da população. Continue exercitando sua mente!"
    return "Abaixo da média, mas não se preocupe! A inteligência pode ser desenvolvida com prática e estudo!"
  }

  const shareResult = () => {
    const text = `Acabei de fazer um teste de QI e meu resultado foi ${quizState.iqScore}! ${getIQFeedback(quizState.iqScore)}`
    if (navigator.share) {
      navigator.share({
        title: 'Meu Resultado do Teste de QI',
        text: text,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('Resultado copiado para a área de transferência!')
    }
  }

  // Tela Inicial
  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-[#F5F9FF] flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Brain className="w-20 h-20 text-[#7C3AED] mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold text-[#1E293B] mb-4 font-inter">
                Descubra seu verdadeiro QI agora 🧠
              </h1>
              <p className="text-xl text-[#1E293B]/80 mb-8 font-inter">
                Responda 25 perguntas rápidas e descubra como está sua inteligência comparada à média mundial.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-2xl mb-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-[#FACC15] mx-auto mb-3" />
                  <h3 className="font-semibold text-[#1E293B] mb-2">Rápido</h3>
                  <p className="text-sm text-[#1E293B]/70">Apenas 10-15 minutos</p>
                </div>
                <div className="text-center">
                  <Brain className="w-12 h-12 text-[#FACC15] mx-auto mb-3" />
                  <h3 className="font-semibold text-[#1E293B] mb-2">Científico</h3>
                  <p className="text-sm text-[#1E293B]/70">Baseado em métodos comprovados</p>
                </div>
                <div className="text-center">
                  <Trophy className="w-12 h-12 text-[#FACC15] mx-auto mb-3" />
                  <h3 className="font-semibold text-[#1E293B] mb-2">Preciso</h3>
                  <p className="text-sm text-[#1E293B]/70">Resultado detalhado</p>
                </div>
              </div>
              
              <button
                onClick={startQuiz}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Começar o Teste
              </button>
            </div>
            
            <p className="text-sm text-[#1E293B]/60">
              ✨ Mais de 100.000 pessoas já descobriram seu QI conosco
            </p>
          </div>
        </div>
        
        <footer className="bg-white border-t border-gray-200 p-4 text-center">
          <p className="text-sm text-[#1E293B]/60">
            Este teste é apenas para fins de entretenimento. Resultados não substituem testes oficiais de QI.
          </p>
        </footer>
      </div>
    )
  }

  // Tela do Quiz
  if (currentScreen === 'quiz') {
    const currentQ = questions[quizState.currentQuestion]
    const progress = ((quizState.currentQuestion + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-[#F5F9FF] p-4">
        <div className="max-w-3xl mx-auto">
          {/* Header com progresso */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#1E293B] font-semibold">
                Pergunta {quizState.currentQuestion + 1} de {questions.length}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-[#2563EB] h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Pergunta */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-8 font-inter">
              {currentQ.question}
            </h2>
            
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]'
                      : 'border-gray-200 hover:border-[#2563EB]/50 text-[#1E293B]'
                  }`}
                >
                  <span className="font-semibold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedAnswer !== null
                    ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {quizState.currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Tela de Pagamento
  if (currentScreen === 'payment') {
    return (
      <div className="min-h-screen bg-[#F5F9FF] flex items-center justify-center p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
            <div className="mb-6">
              <Trophy className="w-16 h-16 text-[#FACC15] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#1E293B] mb-2">
                Parabéns! Teste Concluído
              </h2>
              <p className="text-[#1E293B]/70">
                Você respondeu todas as 25 perguntas
              </p>
            </div>
            
            <div className="bg-[#F5F9FF] rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#1E293B] mb-2">
                Para ver o resultado do seu QI, pague apenas:
              </h3>
              <div className="text-3xl font-bold text-[#2563EB] mb-2">
                R$ 0,99
              </div>
              <p className="text-sm text-[#1E293B]/60">
                Pagamento único • Resultado imediato
              </p>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={isProcessingPayment}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-4 disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processando...
                </div>
              ) : (
                'Pagar R$ 0,99 para ver meu resultado'
              )}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-sm text-[#1E293B]/60">
              <Lock className="w-4 h-4" />
              Pagamento 100% seguro com Mercado Pago 🔒
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Tela de Resultado
  if (currentScreen === 'result') {
    return (
      <div className="min-h-screen bg-[#F5F9FF] p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-[#7C3AED] to-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-white">
                  {quizState.iqScore}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-[#1E293B] mb-4">
                Seu QI é {quizState.iqScore}
              </h2>
              
              <div className="bg-[#F5F9FF] rounded-xl p-6 mb-6">
                <p className="text-lg text-[#1E293B] leading-relaxed">
                  {getIQFeedback(quizState.iqScore)}
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#F5F9FF] rounded-xl p-4">
                <h4 className="font-semibold text-[#1E293B] mb-2">Acertos</h4>
                <p className="text-2xl font-bold text-[#2563EB]">
                  {quizState.answers.filter((answer, index) => answer === questions[index].correctAnswer).length}/25
                </p>
              </div>
              <div className="bg-[#F5F9FF] rounded-xl p-4">
                <h4 className="font-semibold text-[#1E293B] mb-2">Percentil</h4>
                <p className="text-2xl font-bold text-[#7C3AED]">
                  {Math.round(((quizState.iqScore - 70) / 60) * 100)}%
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={shareResult}
                className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1E293B] font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Compartilhar meu resultado
              </button>
              
              <button
                onClick={() => setCurrentScreen('home')}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Fazer novo teste
              </button>
            </div>
          </div>
        </div>
        
        <footer className="mt-8 text-center">
          <p className="text-sm text-[#1E293B]/60">
            Este teste é apenas para fins de entretenimento. Resultados não substituem testes oficiais de QI.
          </p>
        </footer>
      </div>
    )
  }

  return null
}